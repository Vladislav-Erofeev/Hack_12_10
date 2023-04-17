package tft.GameBackend.services;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tft.GameBackend.dto.PersonDTO;
import tft.GameBackend.entities.Person;
import tft.GameBackend.errors.PersonNotFoundException;
import tft.GameBackend.reopsitories.PersonRepository;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class PersonService {
    private final PersonRepository personRepository;

    @Autowired
    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public List<Person> findAll() {
        return personRepository.findAll();
    }

    public List<Person> getSentRequests(long id) throws PersonNotFoundException {
        Optional<Person> person = personRepository.findById(id);
        if(person.isEmpty())
            throw  new PersonNotFoundException("person with id=" + id + " not found");
        Hibernate.initialize(person.get().getSentFriendsRequests());
        return person.get().getSentFriendsRequests();
    }

    public List<Person> getReceivedRequests(long id) throws PersonNotFoundException {
        Optional<Person> person = personRepository.findById(id);
        if(person.isEmpty())
            throw  new PersonNotFoundException("person with id=" + id + " not found");
        Hibernate.initialize(person.get().getReceivedFriendsRequests());
        return person.get().getReceivedFriendsRequests();
    }

    public List<Person> getFriendsList(long id) throws PersonNotFoundException {
        Optional<Person> optionalPerson= personRepository.findById(id);
        if(optionalPerson.isEmpty())
            throw  new PersonNotFoundException("person with id=" + id + " not found");
        Person person = optionalPerson.get();
        List<Person> people = new LinkedList<>();

        people.addAll(person.getFriendsList1());
        people.addAll(person.getFriendsList2());
        return people;
    }

    public Person getById(long id) throws PersonNotFoundException {
        Optional<Person> person = personRepository.findById(id);
        if(person.isEmpty())
            throw  new PersonNotFoundException("person with id=" + id + " not found");
        return person.get();
    }
}
