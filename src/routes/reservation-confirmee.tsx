import { createFileRoute } from '@tanstack/react-router';
import { ReservationConfirmed } from '@/components/reservation-confirmed';
export const Route = createFileRoute('/reservation-confirmee')({
 head: () => ({ meta: [
 { title: 'Thomas a accepté votre demande — Mini Vadrouille' },
 { name: 'description', content: 'Retrouvez la remise, la restitution et le matériel de votre réservation MV-8841.' },
 { property: 'og:title', content: 'Thomas a accepté votre demande — Mini Vadrouille' },
 { property: 'og:description', content: 'Retrouvez la remise, la restitution et le matériel de votre réservation MV-8841.' },
 { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
 ] }), component: ReservationConfirmed,
});
