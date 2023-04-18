package tft.GameBackend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tft.GameBackend.dto.FeedDTO;
import tft.GameBackend.dto.NewFeedDTO;
import tft.GameBackend.entities.Person;
import tft.GameBackend.errors.FeedNotFoundException;
import tft.GameBackend.errors.PersonNotFoundException;
import tft.GameBackend.mappers.FeedMapper;
import tft.GameBackend.services.FeedService;
import tft.GameBackend.services.PersonService;
import tft.GameBackend.utils.AuthenticatedPersonService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/feed")
@RequiredArgsConstructor
public class FeedController {
    private final FeedService feedService;
    private final AuthenticatedPersonService authenticatedPersonService;
    private final FeedMapper feedMapper = FeedMapper.INSTANCE;

    private final PersonService personService;

    /**
     * GET - "/feed"
     * Получение постов
     *
     * @param limit - количество постов на странице (по умолчанию 20)
     * @param page  - номер страницы (по умолчанию 0)
     * @return массив объектов {
     * *         "author": {
     * *             "id": id автора,
     * *             "name": имя автора
     * *         },
     * *         "body": тело поста
     * *     }
     * @throws PersonNotFoundException
     */
    @GetMapping
    public List<FeedDTO> getFeeds(@RequestParam(value = "limit", defaultValue = "20") int limit,
                                  @RequestParam(value = "page", defaultValue = "0") int page) throws PersonNotFoundException {
        return feedService.findAll(limit, page).stream()
                .map(feedMapper::feedToFeedDTO).collect(Collectors.toList());
    }

    /**
     * GET - "/feed/{id}"
     * Получение поста по его id
     *
     * @param id - id поста
     * @return Пост в формате {
     * "author": {
     * "id": id автора,
     * "name": имя автора
     * },
     * "body": тело поста
     * }
     * @throws FeedNotFoundException
     */
    @GetMapping("/{id}")
    public FeedDTO getFeed(@PathVariable("id") int id) throws FeedNotFoundException {
        return feedMapper.feedToFeedDTO(feedService.getById(id));
    }

    /**
     * GET - "/feed/person/{id}"
     * Получение списка постов человека
     *
     * @param personId - id человека, посты которого надо получить
     * @return массив объектов  {
     * "author": {
     * "id": id автора,
     * "name": имя автора
     * },
     * "body": тело поста
     * }
     */

    @GetMapping("/person/{id}")
    public List<FeedDTO> getPersonFeeds(@PathVariable("id") long personId) {
        return feedService.getPersonFeeds(personId).stream()
                .map(feedMapper::feedToFeedDTO).collect(Collectors.toList());
    }

    /**
     * POST - "/feed/add"
     * Добавление нового поста
     *
     * @param newFeedDTO - Объект поста вида {
     *                   "body": содержание поста
     *                   }
     * @return OK
     * @throws PersonNotFoundException
     */

    @PostMapping("/add")
    public HttpStatus add(@RequestBody NewFeedDTO newFeedDTO) throws PersonNotFoundException {
        Person person = authenticatedPersonService.getAuthenticatedPerson();
        feedService.save(person.getId(), newFeedDTO.getBody());
        return HttpStatus.OK;
    }

    /**
     * PATCH - "/feed/edit/{id}"
     * Редактирование поста
     *
     * @param newFeedDTO - Объект поста вида {
     *                   "body": содержание поста
     *                   }
     * @param feedId     - id поста
     * @return OK
     * @throws FeedNotFoundException
     */

    @PatchMapping("/edit/{id}")
    public HttpStatus editFeed(@RequestBody NewFeedDTO newFeedDTO, @PathVariable("id") long feedId) throws FeedNotFoundException {
        Person person = authenticatedPersonService.getAuthenticatedPerson();
        if (person.getId() != feedService.getById(feedId).getAuthor().getId())
            return HttpStatus.LOCKED;
        feedService.edit(feedId, newFeedDTO.getBody());
        return HttpStatus.OK;
    }

    /**
     * DELETE - "/feed/delete/{id}"
     * Удаление поста
     *
     * @param feedId - id поста
     * @return OK
     * @throws FeedNotFoundException
     */

    @DeleteMapping("/delete/{id}")
    public HttpStatus deleteFeed(@PathVariable("id") long feedId) throws FeedNotFoundException {
        Person person = authenticatedPersonService.getAuthenticatedPerson();
        if (person.getId() != feedService.getById(feedId).getAuthor().getId())
            return HttpStatus.LOCKED;
        feedService.delete(feedId);
        return HttpStatus.OK;
    }
}
