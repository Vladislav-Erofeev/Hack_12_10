package tft.GameBackend.reopsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tft.GameBackend.entities.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
}
