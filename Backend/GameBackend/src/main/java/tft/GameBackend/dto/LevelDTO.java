package tft.GameBackend.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LevelDTO {
    int[][] field;
    String url;
    int box;
    int stoplight;
    int smooth;
}
