package tft.GameBackend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import tft.GameBackend.dto.FriendDTO;
import tft.GameBackend.entities.Person;
import tft.GameBackend.errors.PersonErrorResponse;
import tft.GameBackend.errors.PersonNotFoundException;
import tft.GameBackend.mappers.PersonMapper;
import tft.GameBackend.services.FriendService;
import tft.GameBackend.services.PersonService;
import tft.GameBackend.utils.AuthenticatedPersonService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/friends")
public class FriendController {
    private final PersonService personService;
    private final AuthenticatedPersonService authenticatedPersonService;
    private final PersonMapper personMapper = PersonMapper.INSTANCE;
    private final FriendService friendService;

    /**
     * GET - "/friends"
     * Получение списка друзей
     * @return массив объектов {
     *  "id" : id пользователя
     *  "name": имя пользователя
     *  "email": адрес электронной почты
     *  }
     */
    @GetMapping
    public List<FriendDTO> getFriendsList() throws PersonNotFoundException {
        Person person = authenticatedPersonService.getAuthenticatedPerson();
        return personService.getFriendsList(person.getId()).stream()
                .map(personMapper::personToFriendDTO).collect(Collectors.toList());
    }

    /**
     * GET - "/friends/sent_requests"
     * Получение списка отправленных запросов на дружбу
     * @return массив объектов {
     *     "id" : id пользователя
     *     "name": имя пользователя
     *     "email": адрес электронной почты
     * }
     * @throws PersonNotFoundException
     */
    @GetMapping("/sent_requests")
    public List<FriendDTO> getSentFriendsRequests() throws PersonNotFoundException {
        Person person = authenticatedPersonService.getAuthenticatedPerson();
        return personService.getSentRequests(person.getId()).stream()
                .map(personMapper::personToFriendDTO).collect(Collectors.toList());
    }

    /**
     * GET - "/friends/received_requests"
     * Получение списка запросов на дружбу
     * @return массив объектов {
     *      *     "id" : id пользователя
     *      *     "name": имя пользователя
     *      *     "email": адрес электронной почты
     *      * }
     * @throws PersonNotFoundException
     */
    @GetMapping("/received_requests")
    public List<FriendDTO> getReceivedFriendsRequests() throws PersonNotFoundException {
        Person person = authenticatedPersonService.getAuthenticatedPerson();
        return personService.getReceivedRequests(person.getId()).stream()
                .map(personMapper::personToFriendDTO).collect(Collectors.toList());
    }

    /**
     * POST - "/friends/send_request/{id}"
     * Отправление запроса на дружбу
     * @param personTo - id пользователя, который получит запрос
     * @return OK
     */
    @PostMapping("/send_request/{id}")
    public HttpStatus sendFriendRequest(@PathVariable("id") int personTo) {
        Person person = authenticatedPersonService.getAuthenticatedPerson();
        friendService.sendRequest(person.getId(), personTo);
        return HttpStatus.OK;
    }

    /**
     * POST - "/friends/friend_request/{id}"
     * Принятие запроса на дружбу
     * @param personFrom - Отправитель запроса на дружбу
     * @return
     */

    @PostMapping("/friend_request/{id}")
    public HttpStatus acceptFriendRequest(@PathVariable("id") int personFrom) {
        Person person = authenticatedPersonService.getAuthenticatedPerson();
        friendService.acceptRequest(personFrom, person.getId());
        return HttpStatus.OK;
    }

    /**
     * DELETE - "/friends/friend_request/{id}"
     * Отклонение запроса на дружбу
     * @param personFrom - отправитель запроса на дружбу
     * @return
     */

    @DeleteMapping("/friend_request/{id}")
    public HttpStatus denyFriendRequest(@PathVariable("id") int personFrom) {
        Person person = authenticatedPersonService.getAuthenticatedPerson();
        friendService.denyRequest(personFrom, person.getId());
        return HttpStatus.OK;
    }

    @ExceptionHandler
    public ResponseEntity<PersonErrorResponse> personNotFound(PersonNotFoundException e) {
        PersonErrorResponse response = new PersonErrorResponse(e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}
