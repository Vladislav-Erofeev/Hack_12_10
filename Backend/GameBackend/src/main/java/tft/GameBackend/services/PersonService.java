package tft.GameBackend.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tft.GameBackend.dto.PersonDTO;
import tft.GameBackend.entities.Person;
import tft.GameBackend.entities.Score;
import tft.GameBackend.errors.PersonNotFoundException;
import tft.GameBackend.reopsitories.PersonRepository;

import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PersonService {

    @PersistenceContext
    private final EntityManager em;
    private final PersonRepository personRepository;

    public List<Person> findAll() {
        return personRepository.findAll();
    }

    public List<Person> getSentRequests(long id) throws PersonNotFoundException {
        Optional<Person> person = personRepository.findById(id);
        if (person.isEmpty())
            throw new PersonNotFoundException("person with id=" + id + " not found");
        Hibernate.initialize(person.get().getSentFriendsRequests());
        return person.get().getSentFriendsRequests();
    }

    public List<Person> getReceivedRequests(long id) throws PersonNotFoundException {
        Optional<Person> person = personRepository.findById(id);
        if (person.isEmpty())
            throw new PersonNotFoundException("person with id=" + id + " not found");
        Hibernate.initialize(person.get().getReceivedFriendsRequests());
        return person.get().getReceivedFriendsRequests();
    }

    public List<Person> getFriendsList(long id) throws PersonNotFoundException {
        Optional<Person> optionalPerson = personRepository.findById(id);
        if (optionalPerson.isEmpty())
            throw new PersonNotFoundException("person with id=" + id + " not found");
        Person person = optionalPerson.get();
        List<Person> people = new LinkedList<>();

        people.addAll(person.getFriendsList1());
        people.addAll(person.getFriendsList2());
        return people;
    }

    public Person getById(long id) throws PersonNotFoundException {
        Optional<Person> person = personRepository.findById(id);
        if (person.isEmpty())
            throw new PersonNotFoundException("person with id=" + id + " not found");
        return person.get();
    }

    public List<Person> sortPeopleByBestScoreFromLess() {
        Session session = em.unwrap(Session.class);

        CriteriaBuilder builder = session.getCriteriaBuilder();
        CriteriaQuery<Person> studentCriteriaQuery = builder.createQuery(Person.class);
        Root<Person> root = studentCriteriaQuery.from(Person.class);

        studentCriteriaQuery.select(root).orderBy(builder.asc(root.get("bestScore")));
        return session.createQuery(studentCriteriaQuery).getResultList();
    }

    public List<Person> sortPeopleByBestScoreFromHigher() {
        Session session = em.unwrap(Session.class);

        CriteriaBuilder builder = session.getCriteriaBuilder();
        CriteriaQuery<Person> studentCriteriaQuery = builder.createQuery(Person.class);
        Root<Person> root = studentCriteriaQuery.from(Person.class);

        studentCriteriaQuery.select(root).orderBy(builder.desc(root.get("bestScore")));
        return session.createQuery(studentCriteriaQuery).getResultList();
    }

    public int getPersonsRatingPosition(int id) throws PersonNotFoundException {
        for (int i = 0; i < sortPeopleByBestScoreFromHigher().size(); i++) {
            if (sortPeopleByBestScoreFromHigher().get(i).getId() == id) return i+1;
        }
        return -1;
    }

    public List<Person> getTopTen() {
        List<Person> list = sortPeopleByBestScoreFromHigher();
        return list.subList(0, Math.min(list.size(), 10));
    }

}
