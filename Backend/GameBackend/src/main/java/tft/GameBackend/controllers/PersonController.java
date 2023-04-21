package tft.GameBackend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tft.GameBackend.dto.PersonDTO;
import tft.GameBackend.dto.PersonItemDTO;
import tft.GameBackend.entities.Person;
import tft.GameBackend.errors.PersonErrorResponse;
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
     * GET - "/person/all"
     * Получение списка людей
     * @param search - строка поиска
     * @param limit - количество людей на странице (20 по умолчанию)
     * @param page - номер страницы (0 по умолчанию)
     * @return массив объектов {
     *     "id": id пользователя
     *     "name": имя пользователя
     *     "url": имя фотографии
     * }
     */
    @GetMapping("/all")
    public List<PersonItemDTO> getPersonList(@RequestParam(value = "search", defaultValue = "") String search,
                                             @RequestParam(value = "limit", defaultValue = "20") int limit,
                                             @RequestParam(value = "page", defaultValue = "0") int page) {
        return personService.findAll(search, limit, page).stream()
                .map(personMapper::personToPersonItemDTO).collect(Collectors.toList());

    }


    /**
     * GET - "/person/{id}"
     * Получение пользователя по id
     * @param id - id пользователя
     * @return объект {
     *     "id": id пользователя
     *     "name": имя пользователя
     *     "email": адрес электронной почты
     *     "bestScore": лучший результат
     *     "url": имя фотографии
     * }
     * @throws PersonNotFoundException
     */
    @GetMapping("/{id}")
    public PersonDTO getPersonById(@PathVariable("id") long id) throws PersonNotFoundException {
        return personMapper.personToPersonDTO(personService.getById(id));
    }

    @ExceptionHandler
    public ResponseEntity<PersonErrorResponse> personNotFound(PersonNotFoundException e) {
        PersonErrorResponse response = new PersonErrorResponse(e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * GET - "/person/sortPeopleByBestScoreFromLess"
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
     * GET - "/person/sortPeopleByBestScoreFromHigher"
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
