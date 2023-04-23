-- liquibase formatted sql

-- changeSet Danil:2
alter table score add column date date

-- rollback alter table drop column date;