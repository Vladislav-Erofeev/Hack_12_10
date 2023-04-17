package tft.GameBackend.reopsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tft.GameBackend.entities.Feed;

import java.util.List;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Long> {
    List<Feed> findByAuthorId(long authorId);
}
