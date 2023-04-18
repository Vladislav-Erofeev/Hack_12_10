package tft.GameBackend.reopsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import tft.GameBackend.entities.Score;

import java.util.List;

public interface ScoreRepository extends JpaRepository<Score, Long> {
    List<Integer> findByPersonId(long personId);
}
