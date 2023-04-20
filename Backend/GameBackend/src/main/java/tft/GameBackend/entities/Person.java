package tft.GameBackend.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
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
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String username;

    String email;

    String password;

    int bestScore;

    private String url;

    @Enumerated(EnumType.STRING)
    Role role;

    @ManyToMany
    @JoinTable(name = "friend_request",
    joinColumns = @JoinColumn(name = "person_from"),
    inverseJoinColumns = @JoinColumn(name = "person_to"))
    List<Person> sentFriendsRequests;

    @ManyToMany(mappedBy = "sentFriendsRequests")
    List<Person> receivedFriendsRequests;

    @ManyToMany
    @JoinTable(name = "friends",
    joinColumns = @JoinColumn(name = "person1_id"),
    inverseJoinColumns = @JoinColumn(name = "person2_id"))
    List<Person> friendsList1;

    @ManyToMany(mappedBy = "friendsList1")
    List<Person> friendsList2;

    @OneToMany(mappedBy = "author")
    List<Feed> feeds;

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

    public void addFeed(Feed feed) {
        if(feeds == null)
            feeds = new LinkedList<>();
        feeds.add(feed);
    }

}
