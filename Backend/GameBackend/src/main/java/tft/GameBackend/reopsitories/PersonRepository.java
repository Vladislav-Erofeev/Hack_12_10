package tft.GameBackend.reopsitories;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tft.GameBackend.entities.Person;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    Optional<Person> findByEmail(String email);

    List<Person> findAllByUsernameContainingIgnoreCase(String search, PageRequest pageRequest);
}
