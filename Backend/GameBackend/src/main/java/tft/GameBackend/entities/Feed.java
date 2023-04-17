package tft.GameBackend.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Feed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    private Person author;

    @Column(name = "body")
    private String body;
}
