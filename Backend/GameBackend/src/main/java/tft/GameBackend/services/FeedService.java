package tft.GameBackend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tft.GameBackend.entities.Feed;
import tft.GameBackend.entities.Person;
import tft.GameBackend.errors.FeedNotFoundException;
import tft.GameBackend.errors.PersonNotFoundException;
import tft.GameBackend.reopsitories.FeedRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FeedService {
    private final FeedRepository feedRepository;
    private final PersonService personService;

    public List<Feed> getPersonFeeds(long personId) {
        return feedRepository.findByAuthorId(personId);
    }

    public List<Feed> findAll(int limit, int page) {
        return feedRepository.findAll(PageRequest.of(page, limit, Sort.by("id"))).getContent();
    }

    @Transactional
    public void save(long personId, String body) throws PersonNotFoundException {
        Person person = personService.getById(personId);
        Feed feed = new Feed();
        feed.setAuthor(person);
        feed.setBody(body);
        person.addFeed(feed);
        feedRepository.save(feed);
    }

    public Feed getById(long id) throws FeedNotFoundException {
        Optional<Feed> optionalFeed = feedRepository.findById(id);
        if (optionalFeed.isEmpty())
            throw new FeedNotFoundException("Feed with id=" + id + " not found");
        return optionalFeed.get();
    }

    @Transactional
    public void edit(long id, String body) throws FeedNotFoundException {
        Optional<Feed> optionalFeed = feedRepository.findById(id);
        if (optionalFeed.isEmpty())
            throw new FeedNotFoundException("Feed with id=" + id + " not found");
        Feed feed = optionalFeed.get();
        feed.setBody(body);
    }

    @Transactional
    public void delete(long id) {
        feedRepository.deleteById(id);
    }
}
