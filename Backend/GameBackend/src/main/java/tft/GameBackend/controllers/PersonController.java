package tft.GameBackend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tft.GameBackend.dto.PersonDTO;
import tft.GameBackend.entities.Person;
import tft.GameBackend.mappers.PersonMapper;
import tft.GameBackend.services.PersonService;
import tft.GameBackend.utils.AuthenticatedPersonService;

@RestController
@RequestMapping("/person")
@RequiredArgsConstructor
public class PersonController {
    private final PersonService personService;
    private final AuthenticatedPersonService authenticatedPersonService;
    private final PersonMapper personMapper = PersonMapper.INSTANCE;

    @GetMapping
    public PersonDTO getPersonInformation() {
        Person person = authenticatedPersonService.getAuthenticatedPerson();
        return personMapper.personToPersonDTO(person);
    }

}
