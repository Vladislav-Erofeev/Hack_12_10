package tft.GameBackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

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

    private String url;

    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToMany
    @JoinTable(name = "friend_request",
            joinColumns = @JoinColumn(name = "person_from"),
            inverseJoinColumns = @JoinColumn(name = "person_to"))
    private List<Person> sentFriendsRequests;

    @ManyToMany(mappedBy = "sentFriendsRequests")
    private List<Person> receivedFriendsRequests;

    @ManyToMany
    @JoinTable(name = "friends",
            joinColumns = @JoinColumn(name = "person1_id"),
            inverseJoinColumns = @JoinColumn(name = "person2_id"))
    private List<Person> friendsList1;

    @ManyToMany(mappedBy = "friendsList1")
    private List<Person> friendsList2;

    @OneToMany(mappedBy = "author")
    private List<Feed> feeds;

    public void addSentFriendsRequests(Person person) {
        if (sentFriendsRequests == null)
            sentFriendsRequests = new LinkedList<>();
        sentFriendsRequests.add(person);
    }

    public void addReceivedFriendsRequests(Person person) {
        if (receivedFriendsRequests == null)
            receivedFriendsRequests = new LinkedList<>();
        receivedFriendsRequests.add(person);
    }

    public void addFriendsList1(Person person) {
        if (friendsList1 == null)
            friendsList1 = new LinkedList<>();
        friendsList1.add(person);
    }

    public void addFriendsList2(Person person) {
        if (friendsList2 == null)
            friendsList2 = new LinkedList<>();
        friendsList2.add(person);
    }

    public void addFeed(Feed feed) {
        if (feeds == null)
            feeds = new LinkedList<>();
        feeds.add(feed);
    }

}
