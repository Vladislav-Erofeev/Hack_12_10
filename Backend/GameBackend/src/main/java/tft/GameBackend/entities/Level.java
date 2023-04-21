package tft.GameBackend.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
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
}
