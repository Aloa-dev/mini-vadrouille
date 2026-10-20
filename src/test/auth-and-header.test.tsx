import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

// The signup call is recorded here so a test can prove nothing is sent before the
// terms box is ticked; vi.hoisted keeps it initialised before the mock factory runs.
const { signUp, sessionRef } = vi.hoisted(() => ({
  signUp: vi.fn(async () => ({ data: { user: null, session: null }, error: null })),
  sessionRef: { user: null as { user_metadata: Record<string, unknown> } | null },
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      signUp,
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      getUser: vi.fn(async () => ({ data: { user: null } })),
      onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: () => {} } } })),
    },
  },
}));

vi.mock("@/hooks/use-session-user", () => ({ useSessionUser: () => sessionRef.user }));

import { AuthDemo } from "@/components/auth-demo";
import { SiteHeader } from "@/components/site-chrome";

// A test-only router: the real routes would load kits from Supabase for no reason here.
async function renderAt(path: "/inscription" | "/") {
  const root = createRootRoute();
  const inscription = createRoute({ getParentRoute: () => root, path: "/inscription", component: () => <AuthDemo register /> });
  const home = createRoute({ getParentRoute: () => root, path: "/", component: () => <SiteHeader /> });
  const router = createRouter({
    routeTree: root.addChildren([inscription, home]),
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  await router.load();
  render(<RouterProvider router={router} />);
}

const termsMessage = "Vous devez accepter les CGU pour créer votre compte.";

describe("Inscription form", () => {
  beforeEach(() => {
    signUp.mockClear();
    sessionRef.user = null;
  });

  it("refuses to create an account while the terms box is empty", async () => {
    const user = userEvent.setup();
    await renderAt("/inscription");
    await user.type(screen.getByLabelText("Mot de passe"), "Motdepasse123");
    await user.click(screen.getByRole("button", { name: "Créer mon compte" }));

    expect(screen.getByText(termsMessage)).toBeInTheDocument();
    expect(signUp).not.toHaveBeenCalled();
  });

  it("clears the terms message once the box is ticked and sends the signup", async () => {
    const user = userEvent.setup();
    await renderAt("/inscription");
    await user.type(screen.getByLabelText("Mot de passe"), "Motdepasse123");
    const terms = screen.getByRole("checkbox", { name: "J'accepte les CGU et la politique de confidentialité" });
    await user.click(terms);
    expect(screen.queryByText(termsMessage)).toBeNull();

    await user.click(screen.getByRole("button", { name: "Créer mon compte" }));
    await vi.waitFor(() => expect(signUp).toHaveBeenCalledTimes(1));
  });

  it("deselects an age bracket when it is clicked a second time", async () => {
    const user = userEvent.setup();
    await renderAt("/inscription");
    const chosen = screen.getByRole("button", { pressed: true });
    const label = chosen.textContent ?? "";

    await user.click(chosen);
    expect(screen.queryAllByRole("button", { pressed: true })).toHaveLength(0);

    await user.click(screen.getByRole("button", { name: label }));
    expect(screen.getAllByRole("button", { pressed: true })).toHaveLength(1);
  });
});

describe("Header navigation", () => {
  beforeEach(() => {
    signUp.mockClear();
    sessionRef.user = null;
  });

  it("hides the reservations link when nobody is signed in", async () => {
    await renderAt("/");
    expect(screen.queryByRole("link", { name: "Mes réservations" })).toBeNull();
  });

  it("shows the reservations link for a signed-in person", async () => {
    sessionRef.user = { user_metadata: { prenom: "Chloé" } };
    await renderAt("/");
    expect(screen.getByRole("link", { name: "Mes réservations" })).toHaveAttribute("href", "/mes-reservations");
  });
});
