-- liquibase formatted sql

-- changeSet Danil:7
alter table person add role varchar;
-- rollback alter table person drop column best_score;