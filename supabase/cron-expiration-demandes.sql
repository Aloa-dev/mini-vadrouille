-- =============================================================================
-- Automatisation : expiration des demandes de réservation sans réponse
-- Projet : Mini Vadrouille
--
-- Règle métier (PRD) : le loueur a 24 h pour répondre à une demande. Passé ce
-- délai, la demande passe automatiquement au statut « expiree », sans
-- intervention manuelle.
--
-- Mécanisme : tâche planifiée Supabase (extension pg_cron, activée dans
-- Supabase > Database > Extensions). Elle se déclenche à chaque heure pile
-- (minute 0) et exécute la mise à jour ci-dessous.
--
-- Ce que la tâche modifie : uniquement le statut et la date de mise à jour des
-- réservations « en_attente » dont reponse_limite_le est dépassé. Elle ne
-- supprime rien.
--
-- Limites assumées :
--   - Le remboursement Stripe lié à l'expiration n'est pas codé.
--   - Une demande peut expirer jusqu'à une heure après son délai (fréquence
--     horaire).
--
-- Mise en place : coller ce fichier dans Supabase > SQL Editor et l'exécuter.
-- La requête renvoie l'identifiant de la tâche (jobid).
-- =============================================================================

select cron.schedule(
  'expirer-demandes-sans-reponse',
  '0 * * * *',
  $$ update public.reservations
     set statut = 'expiree', mis_a_jour_le = now()
     where statut = 'en_attente' and reponse_limite_le < now() $$
);

-- -----------------------------------------------------------------------------
-- Vérifications (à lancer à part, en lecture seule)
-- -----------------------------------------------------------------------------

-- 1. La tâche existe et est active :
--    select jobid, jobname, schedule, active from cron.job;

-- 2. Les derniers passages (attendu : status = succeeded ; « UPDATE 0 » veut dire
--    qu'aucune demande n'était à faire expirer à ce moment-là) :
--    select status, return_message, start_time
--    from cron.job_run_details
--    order by start_time desc
--    limit 5;

-- 3. Voir ce que la tâche modifierait, sans rien modifier :
--    select id, statut, demande_le, reponse_limite_le
--    from reservations
--    where statut = 'en_attente' and reponse_limite_le < now();

-- -----------------------------------------------------------------------------
-- Arrêter la tâche
-- -----------------------------------------------------------------------------
--    select cron.unschedule('expirer-demandes-sans-reponse');
