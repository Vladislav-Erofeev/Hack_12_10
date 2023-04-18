package tft.GameBackend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tft.GameBackend.dto.NewScoreDTO;
import tft.GameBackend.errors.PersonNotFoundException;
import tft.GameBackend.mappers.ScoreMapper;
import tft.GameBackend.services.ScoreService;
import tft.GameBackend.utils.AuthenticatedPersonService;

@RestController
@RequestMapping("/stats")
@RequiredArgsConstructor
public class StatisticController {

    private final ScoreService scoreService;
    private final ScoreMapper scoreMapper = ScoreMapper.INSTANCE;
    private final AuthenticatedPersonService authenticatedPersonService;

    @GetMapping("/{id}")
    public long getPersonsBestScore(@PathVariable("id") long id) throws PersonNotFoundException {
        return scoreService.getBestScoreById(id);
    }

    //todo добавить дату установки результата
    //todo сделать вывод всей таблицы счетов для конкретного типа
    //todo написать комментарии ко всем методам

    @PostMapping("/setScore")
    public void setPersonBestScore(@RequestBody NewScoreDTO newscoreDTO) throws PersonNotFoundException {
        long personId = authenticatedPersonService.getAuthenticatedPerson().getId();
        if (scoreService.findBestScoreById(personId) < newscoreDTO.getScore()) {
            scoreService.setBestScoreById(personId, newscoreDTO.getScore());
            scoreService.addScoreById(personId, newscoreDTO.getScore());
        }
        else
            scoreService.addScoreById(personId, newscoreDTO.getScore());
    }




}
