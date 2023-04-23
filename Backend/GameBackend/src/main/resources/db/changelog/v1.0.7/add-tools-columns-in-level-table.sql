-- liquibase formatted sql

-- changeSet Vladislav:1
alter table level add column box int;
alter table level add column stoplight int;
alter table level add column smooth int;
-- rollback alter table level drop column box; alter table level drop column stoplight; alter table level drop column freeze;