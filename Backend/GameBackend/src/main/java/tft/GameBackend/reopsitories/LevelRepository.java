package tft.GameBackend.reopsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tft.GameBackend.entities.Level;

@Repository
public interface LevelRepository extends JpaRepository<Level, Long> {
}
