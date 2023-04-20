package tft.GameBackend.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.RequiredArgsConstructor;
import org.hibernate.Session;
import org.springframework.stereotype.Service;
import tft.GameBackend.entities.Person;
import tft.GameBackend.entities.Score;
import tft.GameBackend.errors.PersonNotFoundException;
import tft.GameBackend.reopsitories.ScoreRepository;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScoreService {

    private final ScoreRepository scoreRepository;
    private final PersonService personService;

    public List<Score> findAll() {
        return scoreRepository.findAll();
    }

    public long getBestScoreById(long id) throws PersonNotFoundException {
        Person person = personService.getById(id);
        return person.getBestScore();
    }

    public void setBestScoreById(long id, int bestScore) throws PersonNotFoundException {
        Person person = personService.getById(id);
        person.setBestScore(bestScore);
    }

    public void addScoreById(long id, int scoreToSet) throws PersonNotFoundException {
        LocalDate now = LocalDate.now();
        Score score = new Score();
        score.setScore(scoreToSet);
        score.setPerson(personService.getById(id));
        score.setDate(now);
        scoreRepository.save(score);
    }

    public List<Score> findStatsByPersonId(long id) {
        return scoreRepository.findByPersonId(id);
    }

    // требуется java 14+ версии
    public List<Score> getScoresForLastWeekForPerson(Person person) {
        List<Score> list = scoreRepository.findAll();
        LocalDate oneWeekAgo = LocalDate.now().minusWeeks(1);

        return list.stream() // Ляюбда проверяет дату (недельная давность) и принадлженость результата пользователю
                .filter(score -> score.getDate().
                        atStartOfDay(ZoneId.systemDefault()).toInstant().
                        isAfter(oneWeekAgo.atStartOfDay(ZoneId.systemDefault()).toInstant()))
                .filter(score -> score.getPerson().getId() == person.getId())
                .collect(Collectors.toList());
    }

}




