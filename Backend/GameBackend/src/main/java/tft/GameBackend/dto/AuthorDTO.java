package tft.GameBackend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class AuthorDTO {
    private Long id;
    private String url;
    private String name;
}
