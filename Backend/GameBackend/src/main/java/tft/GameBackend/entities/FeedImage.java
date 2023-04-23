package tft.GameBackend.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@Table(name = "feed_images")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FeedImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @Column(name = "url")
    String url;

    @ManyToOne
    @JoinColumn(name = "feed_id", referencedColumnName = "id")
    Feed feed;
}
