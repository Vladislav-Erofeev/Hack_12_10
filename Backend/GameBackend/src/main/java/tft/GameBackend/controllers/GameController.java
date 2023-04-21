package tft.GameBackend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tft.GameBackend.dto.LevelDTO;
import tft.GameBackend.dto.NewLevelDTO;
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

    @GetMapping("/level/{id}")
    public LevelDTO getLevelArray(@PathVariable("id") int levelId) throws LevelNotFoundException {
        return levelService.findById(levelId);
    }

    @PostMapping("/add")
    public HttpStatus addLevel(@RequestPart("field")NewLevelDTO newLevelDTO, @RequestPart MultipartFile file) throws IOException {
        String fileName = imageNameService.generate(file.getContentType());
        Path path = Paths.get(UPLOAD_DIRECTORY + "/level/", fileName);
        Files.write(path, file.getBytes());
        LevelDTO levelDTO = new LevelDTO();
        levelDTO.setField(newLevelDTO.getField());
        levelDTO.setUrl("/level/" + fileName);
        levelService.save(levelDTO);
        return HttpStatus.OK;
    }

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
