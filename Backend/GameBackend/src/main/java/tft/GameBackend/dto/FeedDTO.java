package tft.GameBackend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FeedDTO {
    private long id;
    private String body;
    private AuthorDTO author;
}
