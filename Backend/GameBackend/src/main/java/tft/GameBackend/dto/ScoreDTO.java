package tft.GameBackend.dto;


import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class ScoreDTO {
    int score;
    LocalDate date;
}
