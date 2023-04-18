package tft.GameBackend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import tft.GameBackend.entities.Person;

@Data
@NoArgsConstructor
public class ScoreDTO {
    long id;
    int score;
    Person person;
}
