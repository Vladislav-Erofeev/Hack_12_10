package tft.GameBackend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tft.GameBackend.dto.NewScoreDTO;
import tft.GameBackend.dto.ScoreDTO;
import tft.GameBackend.entities.Person;
import tft.GameBackend.entities.Score;
import tft.GameBackend.errors.PersonNotFoundException;
import tft.GameBackend.mappers.ScoreMapper;
import tft.GameBackend.services.ScoreService;
import tft.GameBackend.utils.AuthenticatedPersonService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/stats")
@RequiredArgsConstructor
public class StatisticController {

    private final ScoreService scoreService;
    private final ScoreMapper scoreMapper = ScoreMapper.INSTANCE;
    private final AuthenticatedPersonService authenticatedPersonService;

    @GetMapping()
    public List<Score> getStats() { // не маплю для проверки работы метода резов недельной давности
        return scoreService.findAll();
//                .stream()
//                .map(scoreMapper::scoreToScoreDTO).collect(Collectors.toList());
    }

    /**
     * GET - "/stats/{id}"
     * Получение статистики пользователя по его id
     *
     * @param id - id пользователя
     * @return Счет пользователя в формате {
     * "score": {
     * "id": id пользователя,
     * "score": счет пользователя
     * }
     * @throws PersonNotFoundException
     */

    @GetMapping("/{id}")
    public long getPersonsBestScore(@PathVariable("id") long id) throws PersonNotFoundException {
        return scoreService.getBestScoreById(id);
    }

    /**
     * POST - "/stats/setScore"
     * Уставноление счета пользователя
     *
     * @param newScoreDTO - Объект сущности вида {
     *                    "score": счет пользователя
     *                    }
     * @throws PersonNotFoundException
     */

    @PostMapping("/setScore")
    public void setPersonsScore(@RequestBody NewScoreDTO newScoreDTO) throws PersonNotFoundException {
        Person person = authenticatedPersonService.getAuthenticatedPerson();
        if (person.getBestScore() < newScoreDTO.getScore()) {
            scoreService.setBestScoreById(person.getId(), newScoreDTO.getScore());
            scoreService.addScoreById(person.getId(), newScoreDTO.getScore());
        } else
            scoreService.addScoreById(person.getId(), newScoreDTO.getScore());
    }

    /**
     * GET - "/stats/getPersonsStats/{id}"
     * Получение статистики одного пользователя
     *
     * @param id - int id пользователя
     */

    @GetMapping("/getPersonsStats/{id}")
    public List<ScoreDTO> getPersonsStats(@PathVariable("id") long id) {
        return scoreService.findStatsByPersonId(id).stream()
                .map(scoreMapper::scoreToScoreDTO).collect(Collectors.toList());
    }

    /**
     * GET - "/getLastWeekResults"
     * Получение статистики пользователя за неделю
     *
     * @return список результатов пользователя в формате {
     * "score": {
     * "id": id пользователя,
     * "score": счет пользователя
     * }
     */

    @GetMapping("/getLastWeekResults")
    public List<ScoreDTO> getLastWeekResults() {
        Person person = authenticatedPersonService.getAuthenticatedPerson();
        return scoreService.getScoresForLastWeekForPerson(person).stream()
                .map(scoreMapper::scoreToScoreDTO).collect(Collectors.toList());
    }


}
