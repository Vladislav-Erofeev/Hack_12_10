package tft.GameBackend.reopsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tft.GameBackend.entities.FeedImage;

@Repository
public interface FeedImageRepository extends JpaRepository<FeedImage, Long> {
}
