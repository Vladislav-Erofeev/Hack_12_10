package tft.GameBackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FriendRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "person_from")
    private Long personFrom;

    @Column(name = "person_to")
    private Long personTo;

    @Column(name = "exp_date")
    @Temporal(TemporalType.DATE)
    private Date expDate;
}
