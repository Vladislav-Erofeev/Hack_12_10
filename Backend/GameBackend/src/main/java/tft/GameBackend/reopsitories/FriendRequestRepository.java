package tft.GameBackend.reopsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tft.GameBackend.entities.FriendRequest;

import java.util.Optional;

@Repository
public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {
    void deleteByPersonFromAndPersonTo(long personFrom, long personTo);

    Optional<FriendRequest> findFriendRequestByPersonFromAndPersonTo(long personFrom, long personTo);
}
