package tft.GameBackend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tft.GameBackend.dto.ScoreDTO;
import tft.GameBackend.errors.PersonNotFoundException;
import tft.GameBackend.services.ScoreService;

@RestController
@RequestMapping("/stats")
@RequiredArgsConstructor
public class StatisticController {

    private final ScoreService scoreService;

    @GetMapping("/{id}")
    public long getPersonsBestScore(@PathVariable("id") long id) throws PersonNotFoundException {
        return scoreService.getBestScoreById(id);
    }

    //todo добавить дату установки результата
    //todo сделать вывод всей таблицы счетов для конкретного типа
    //todo написать комментарии ко всем методам

    @PostMapping("/setScore")
    public void setPersonBestScore(@RequestBody ScoreDTO newscoreDTO) throws PersonNotFoundException {
        long personId = newscoreDTO.getPerson().getId();
        if (scoreService.findBestScoreById(personId) < newscoreDTO.getScore()) {
            scoreService.setBestScoreById(personId, newscoreDTO.getScore());
            scoreService.addScoreById(personId, newscoreDTO.getScore());
        }
        else
            scoreService.addScoreById(personId, newscoreDTO.getScore());
    }




}
