package tft.GameBackend.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

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

    @Temporal(TemporalType.DATE)
   // @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;

}
