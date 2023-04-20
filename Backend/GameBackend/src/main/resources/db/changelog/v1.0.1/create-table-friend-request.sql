-- liquibase formatted sql

-- changeSet Vladislav:1
create table friend_request(
    person_from int references person(id),
    person_to int references person(id),
    exp_date date not null,
    primary key (person_from, person_to)
)
-- rollback drop table friend_request;