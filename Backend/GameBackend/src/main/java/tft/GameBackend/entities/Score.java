package tft.GameBackend.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    int score;

    @ManyToOne
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    Person person;



}
