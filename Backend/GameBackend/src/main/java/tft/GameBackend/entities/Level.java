package tft.GameBackend.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "level")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Level {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "field")
    int[] field;

    @Column(name = "url")
    String url;

    @Column(name = "box")
    int boxCount;

    @Column(name = "stoplight")
    int stoplightCount;

    @Column(name = "smooth")
    int smoothCount;
}
