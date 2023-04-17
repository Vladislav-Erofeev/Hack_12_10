package tft.GameBackend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tft.GameBackend.entities.FriendRequest;
import tft.GameBackend.entities.Person;
import tft.GameBackend.reopsitories.FriendRequestRepository;
import tft.GameBackend.reopsitories.PersonRepository;

import java.util.Calendar;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FriendService {
    private final FriendRequestRepository friendRequestRepository;
    private final PersonRepository personRepository;

    @Transactional
    public void sendRequest(long personFrom, long personTo) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(System.currentTimeMillis());
        calendar.add(Calendar.DAY_OF_MONTH, 3);

        FriendRequest friendRequest = new FriendRequest(null, personFrom, personTo, calendar.getTime());
        friendRequestRepository.save(friendRequest);
    }

    @Transactional
    public void acceptRequest(long personFromId, long personToId) {
        friendRequestRepository.deleteByPersonFromAndPersonTo(personFromId, personToId);
        Person personFrom = personRepository.findById(personFromId).get();
        Person personTo = personRepository.findById(personToId).get();
        personFrom.addFriendsList1(personTo);
        personTo.addFriendsList2(personFrom);
    }

    @Transactional
    public void denyRequest(long personFrom, long personTo) {
        friendRequestRepository.deleteByPersonFromAndPersonTo(personFrom, personTo);
    }
}
