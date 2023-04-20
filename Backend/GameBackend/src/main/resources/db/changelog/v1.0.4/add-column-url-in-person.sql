-- liquibase formatted sql

-- changeSet Vladislav:1

alter table person add column url varchar;

-- rollback alter table person drop column url;