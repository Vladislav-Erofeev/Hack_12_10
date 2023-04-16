-- liquibase formatted sql

-- changeSet Danil:6
insert into person(username, email, password, best_score) VALUES ('danil', 'danil@mail.ru', 'danil', 100);
-- rollback delete from person where email = 'danil@mail.ru';