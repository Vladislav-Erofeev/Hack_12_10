package tft.GameBackend.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.hibernate.Session;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class ScheduledTasksService {
    @PersistenceContext
    private EntityManager entityManager;

    @Scheduled(cron = "0 0 0 * * *")
    @Async
    @Transactional
    public void removeOverdueFriendRequests() {
        Session session = entityManager.unwrap(Session.class);

        System.out.println("scheduled task: delete from friend_request overdue requests");
        Query query = session.createQuery("delete from friend_request where exp_date < current_date");
        query.executeUpdate();
    }
}
