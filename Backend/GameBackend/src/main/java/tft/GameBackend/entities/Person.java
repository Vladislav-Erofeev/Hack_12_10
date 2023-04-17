package tft.GameBackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

@Entity
@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String username;

    private String email;

    private String password;

    private int bestScore;

    @Enumerated(EnumType.STRING)
    private Role role;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "friend_request",
    joinColumns = @JoinColumn(name = "person_from"),
    inverseJoinColumns = @JoinColumn(name = "person_to"))
    private List<Person> sentFriendsRequests;

    @JsonIgnore
    @ManyToMany(mappedBy = "sentFriendsRequests")
    private List<Person> receivedFriendsRequests;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "friends",
    joinColumns = @JoinColumn(name = "person1_id"),
    inverseJoinColumns = @JoinColumn(name = "person2_id"))
    private List<Person> friendsList1;

    @JsonIgnore
    @ManyToMany(mappedBy = "friendsList1")
    private List<Person> friendsList2;

    public void addSentFriendsRequests(Person person) {
        if(sentFriendsRequests == null)
            sentFriendsRequests = new LinkedList<>();
        sentFriendsRequests.add(person);
    }

    public void addReceivedFriendsRequests(Person person) {
        if(receivedFriendsRequests == null)
            receivedFriendsRequests = new LinkedList<>();
        receivedFriendsRequests.add(person);
    }

    public void addFriendsList1(Person person) {
        if(friendsList1 == null)
            friendsList1 = new LinkedList<>();
        friendsList1.add(person);
    }

    public void addFriendsList2(Person person) {
        if(friendsList2 == null)
            friendsList2 = new LinkedList<>();
        friendsList2.add(person);
    }

}
