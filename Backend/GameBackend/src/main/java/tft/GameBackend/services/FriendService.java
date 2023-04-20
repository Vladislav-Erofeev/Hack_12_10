package tft.GameBackend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tft.GameBackend.entities.FriendRequest;
import tft.GameBackend.entities.Person;
import tft.GameBackend.errors.NotUniqueFriendRequest;
import tft.GameBackend.reopsitories.FriendRequestRepository;
import tft.GameBackend.reopsitories.PersonRepository;

import java.util.Calendar;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FriendService {
    private final FriendRequestRepository friendRequestRepository;
    private final PersonRepository personRepository;

    @Transactional
    public void sendRequest(long personFrom, long personTo) throws NotUniqueFriendRequest {
        Optional<FriendRequest> optionalFriendRequest = friendRequestRepository.
                findFriendRequestByPersonFromAndPersonTo(personFrom, personTo);
        if (optionalFriendRequest.isEmpty())
            optionalFriendRequest = friendRequestRepository.findFriendRequestByPersonFromAndPersonTo(personTo, personFrom);
        if (optionalFriendRequest.isPresent())
            throw new NotUniqueFriendRequest("Friend request from " + personFrom + " to " + personTo +
                    " was sent earlier");

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
