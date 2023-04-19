package tft.GameBackend.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Fetch;
import org.springframework.data.repository.cdi.Eager;

import java.util.LinkedList;
import java.util.List;

@Entity
@Data
@Table(name = "feed")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Feed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @ManyToOne
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    Person author;

    @Column(name = "body")
    String body;

    @OneToMany(mappedBy = "feed", fetch = FetchType.EAGER)
    List<FeedImage> images;

    public void addFeedImage(FeedImage image) {
        if (images == null)
            images = new LinkedList<>();
        images.add(image);
    }
}
