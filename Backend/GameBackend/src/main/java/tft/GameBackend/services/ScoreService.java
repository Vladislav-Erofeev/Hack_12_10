package tft.GameBackend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tft.GameBackend.entities.Person;
import tft.GameBackend.entities.Score;
import tft.GameBackend.errors.PersonNotFoundException;
import tft.GameBackend.reopsitories.ScoreRepository;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScoreService {

    private final ScoreRepository scoreRepository;
    private final PersonService personService;

    public long getBestScoreById(long id) throws PersonNotFoundException {
        Person person = personService.getById(id);
        return person.getBestScore();
    }

    public void setBestScoreById(long id, int bestScore) throws PersonNotFoundException {
        Person person = personService.getById(id);
        person.setBestScore(bestScore);
    }

    public int findBestScoreById(long id) {
        return scoreRepository.findByPersonId(id).stream()
                .collect(Collectors.summarizingInt(Integer::intValue)).getMax();
    }

    public void addScoreById(long id, int scoreToSet) throws PersonNotFoundException {
        Score score = new Score();
        score.setScore(scoreToSet);
        score.setPerson(personService.getById(id));
        scoreRepository.save(score);
    }

}