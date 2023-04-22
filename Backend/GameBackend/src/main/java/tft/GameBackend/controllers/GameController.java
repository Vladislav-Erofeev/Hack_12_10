package tft.GameBackend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tft.GameBackend.dto.LevelDTO;
import tft.GameBackend.errors.LevelErrorResponse;
import tft.GameBackend.errors.LevelNotFoundException;
import tft.GameBackend.services.LevelService;
import tft.GameBackend.utils.ImageNameService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/level")
@RequiredArgsConstructor
public class GameController {
    private final LevelService levelService;
    private final ImageNameService imageNameService;
    private final String UPLOAD_DIRECTORY = "C:/images/";

    /**
     * GET - "/level/{id}"
     * Получение уровня по его id
     *
     * @param levelId - id уровня
     * @return объект {
     * "field": двумерный массив int 30 на 30,
     * "url": адрес фотографии
     * }
     * @throws LevelNotFoundException
     */
    @GetMapping("/{id}")
    public LevelDTO getLevelArray(@PathVariable("id") int levelId) throws LevelNotFoundException {
        return levelService.findById(levelId);
    }

    /**
     * POST - "/level/add"
     * Добавление нового уровня
     *
     * @param levelDTO - объект вида {
     *                 int[][] field - матрица игрового поля
     *                 int box - количество коробок
     *                 int stoplight - количество остановок светофора
     *                 int freeze - количество заморозок
     *                 }
     * @param file     - фотография
     * @return OK
     * @throws IOException
     */

    @PostMapping("/add")
    public HttpStatus addLevel(@RequestPart("field") LevelDTO levelDTO, @RequestPart MultipartFile file) throws IOException {
        String fileName = imageNameService.generate(file.getContentType());
        Path path = Paths.get(UPLOAD_DIRECTORY + "/level/", fileName);
        Files.write(path, file.getBytes());
        levelDTO.setUrl("/level/" + fileName);
        levelService.save(levelDTO);
        return HttpStatus.OK;
    }

    /**
     * DELETE - "/level/dele/{id}"
     * Удаление поста по его id
     *
     * @param id - id поста
     * @return
     */

    @DeleteMapping("/delete/{id}")
    public HttpStatus deleteLevel(@PathVariable("id") long id) {
        levelService.deleteById(id);
        return HttpStatus.OK;
    }

    @ExceptionHandler
    public ResponseEntity<LevelErrorResponse> levelNotFound(LevelNotFoundException e) {
        LevelErrorResponse levelErrorResponse = new LevelErrorResponse(e.getMessage());
        return new ResponseEntity<>(levelErrorResponse, HttpStatus.BAD_REQUEST);
    }
}
