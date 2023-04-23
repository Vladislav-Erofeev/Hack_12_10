package tft.GameBackend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tft.GameBackend.entities.Feed;
import tft.GameBackend.entities.FeedImage;
import tft.GameBackend.entities.Person;
import tft.GameBackend.errors.FeedNotFoundException;
import tft.GameBackend.services.FeedImageService;
import tft.GameBackend.services.FeedService;
import tft.GameBackend.services.PersonService;
import tft.GameBackend.utils.AuthenticatedPersonService;
import tft.GameBackend.utils.ImageNameService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequiredArgsConstructor
public class ImageController {
    private final ImageNameService imageNameService;
    private final PersonService personService;
    private final FeedService feedService;
    private final FeedImageService feedImageService;
    private final AuthenticatedPersonService authenticatedPersonService;
    private final String UPLOAD_DIRECTORY = "/images"; // в docker
//    private final String UPLOAD_DIRECTORY = "C:/images"; // на локалке

    /**
     * POST - "/person_image/add"
     * Загрузка фотографии пользователя
     *
     * @param file - файл для загрузки
     * @throws IOException
     */
    @PostMapping("/person_image/add")
    public void savePersonImage(MultipartFile file) throws IOException {
        Person person = authenticatedPersonService.getAuthenticatedPerson();
        String fileName = imageNameService.generate(file.getContentType());

        if (!(person.getUrl() == null)) {
            Files.delete(Path.of(UPLOAD_DIRECTORY + "/person/" + person.getUrl()));
        }
        Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY + "/person/", fileName);
        Files.write(fileNameAndPath, file.getBytes());

        person.setUrl("/person/" + fileName);
        personService.save(person);
    }

    /**
     * POST - "/feed_image/add/{id}"
     * Добавление фотографии к посту
     *
     * @param id   - id поста
     * @param file - файл
     * @throws FeedNotFoundException
     * @throws IOException
     */

    @PostMapping("/feed_image/add/{id}")
    public void saveFeedImage(@PathVariable("id") long id, @RequestBody MultipartFile file) throws FeedNotFoundException, IOException {
        Feed feed = feedService.getById(id);
        String fileName = imageNameService.generate(file.getContentType());
        Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY + "/feed/", fileName);
        Files.write(fileNameAndPath, file.getBytes());

        FeedImage feedImage = new FeedImage();
        feedImage.setFeed(feed);
        feedImage.setUrl("/feed/" + fileName);

        feed.addFeedImage(feedImage);
        feedService.save(feed);
        feedImageService.save(feedImage);
    }

    /**
     * DELETE - "feed_image/delete/{id}"
     * Удаление фотографии у поста
     *
     * @param id - id фотографии
     * @return
     * @throws IOException
     */

    @DeleteMapping("feed_image/delete/{id}")
    public HttpStatus deleteFeedImage(@PathVariable("id") long id) throws IOException {
        FeedImage feedImage = feedImageService.findById(id);
        Person person = authenticatedPersonService.getAuthenticatedPerson();
        if (feedImage.getFeed().getAuthor().getId() != person.getId())
            return HttpStatus.LOCKED;

        Files.delete(Path.of(UPLOAD_DIRECTORY + "/feed/" + feedImage.getUrl()));
        feedImageService.delete(feedImage);
        return HttpStatus.OK;
    }

    @ExceptionHandler
    public ResponseEntity<String> fileIsEmpty(IOException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<String> emptyFile(NullPointerException e) {
        return new ResponseEntity<>("File not found", HttpStatus.BAD_REQUEST);
    }
}
