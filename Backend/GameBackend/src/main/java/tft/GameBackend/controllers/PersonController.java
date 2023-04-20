package tft.GameBackend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tft.GameBackend.dto.PersonDTO;
import tft.GameBackend.entities.Person;
import tft.GameBackend.errors.PersonNotFoundException;
import tft.GameBackend.mappers.PersonMapper;
import tft.GameBackend.services.PersonService;
import tft.GameBackend.utils.AuthenticatedPersonService;

import java.util.List;
import java.util.stream.Collectors;

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

    /**
     * GET - "/person/sortPeopleByBestScore"
     * Получение списка людей отсортированного по рекорду по возрастанию
     *
     * @return List<PersonDTO> - список людей отсортированный по рекорду вида
     * {
     * "id": int id
     * "username": string имя пользователя
     * "email": string email
     * "bestScore": int рекорд пользователя
     * }
     */

    @GetMapping("/sortPeopleByBestScoreFromLess")
    public List<PersonDTO> sortPeopleByBestScoreFromLess() {
        return personService.sortPeopleByBestScoreFromLess().stream()
                .map(personMapper::personToPersonDTO).collect(Collectors.toList());
    }

    /**
     * GET - "/person/sortPeopleByBestScore"
     * Получение списка людей отсортированного по рекорду по убыванию
     *
     * @return List<PersonDTO> - список людей отсортированный по рекорду вида
     * {
     * "id": int id
     * "username": string имя пользователя
     * "email": string email
     * "bestScore": int рекорд пользователя
     * }
     */

    @GetMapping("/sortPeopleByBestScoreFromHigher")
    public List<PersonDTO> sortPeopleByBestScoreFromHigher() {
        return personService.sortPeopleByBestScoreFromHigher().stream()
                .map(personMapper::personToPersonDTO).collect(Collectors.toList());
    }

    /**
     * GET - "/person/getRatingPosition/{id}"
     * Получение списка людей отсортированного по рекорду по убыванию
     *
     * @param id - id пользователя
     * @return int - позицию пользователя в рейтинге
     */

    @GetMapping("/getRatingPosition/{id}")
    public int getRatingPosition(@PathVariable("id") int id) throws PersonNotFoundException {
        return personService.getPersonsRatingPosition(id);
    }

    /**
     * GET - "/person/getTopTen"
     * Получение списка первых 10 людей отсортированного по рекорду по убыванию
     *
     * @return List<PersonDTO> - список первых 10 людей отсортированный по рекорду вида
     * {
     * "id": int id
     * "username": string имя пользователя
     * "email": string email
     * "bestScore": int рекорд пользователя
     * }
     */

    @GetMapping("/getTopTen")
    public List<PersonDTO> getTopTen() {
        return personService.getTopTen().stream()
                .map(personMapper::personToPersonDTO).collect(Collectors.toList());
    }

}
