package tft.GameBackend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tft.GameBackend.entities.FeedImage;
import tft.GameBackend.reopsitories.FeedImageRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FeedImageService {
    private final FeedImageRepository feedImageRepository;

    @Transactional
    public void save(FeedImage feedImage) {
        feedImageRepository.save(feedImage);
    }

    public FeedImage findById(long id) {
        return feedImageRepository.findById(id).get();
    }

    @Transactional
    public void delete(FeedImage feedImage) {
        feedImageRepository.delete(feedImage);
    }
}
