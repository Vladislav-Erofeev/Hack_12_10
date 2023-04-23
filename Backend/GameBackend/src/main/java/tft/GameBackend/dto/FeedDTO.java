package tft.GameBackend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class FeedDTO {
    private long id;
    private String body;
    private AuthorDTO author;
    private List<FeedImageDTO> images;
}
