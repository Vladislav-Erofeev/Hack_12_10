package tft.GameBackend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import tft.GameBackend.entities.Person;
import tft.GameBackend.services.PersonService;
import tft.GameBackend.utils.AuthenticatedPersonService;
import tft.GameBackend.utils.ImageNameService;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequiredArgsConstructor
public class ImageController {
    private final ImageNameService imageNameService;
    private final PersonService personService;
    private final AuthenticatedPersonService authenticatedPersonService;
    private final String UPLOAD_DIRECTORY = "C:/images/";
//    private final String UPLOAD_DIRECTORY = "/images/"; // в docker

    /**
     * POST - "/person_image/add"
     * Загрузка фотографии пользователя
     * @param file - файл для загрузки
     * @throws IOException
     */
    @PostMapping("/person_image/add")
    public void saveFeedImage(MultipartFile file) throws IOException {
        Person person = authenticatedPersonService.getAuthenticatedPerson();
        String fileName = imageNameService.generate(file.getContentType());

        if(!person.getUrl().isBlank()) {
            Files.delete(Path.of(UPLOAD_DIRECTORY + "/person/" + person.getUrl()));
        }
        Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY + "/person/", fileName);
        Files.write(fileNameAndPath, file.getBytes());

        person.setUrl(fileName);
        personService.save(person);
    }
}
