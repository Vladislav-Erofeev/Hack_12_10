-- liquibase formatted sql

-- changeSet Vladislav:4
create table friends(
    person1_id int references person(id),
    person2_id int references person(id),
    status varchar,
    primary key(person1_id, person2_id)
);
-- rollback drop table friends;