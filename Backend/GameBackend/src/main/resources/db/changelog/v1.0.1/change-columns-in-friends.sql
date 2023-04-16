-- liquibase formatted sql

-- changeSet Vladislav:5
alter table friends drop column status;
-- rollback alter table friends add column status varchar;