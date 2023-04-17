package tft.GameBackend.utils;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tft.GameBackend.entities.Person;
import tft.GameBackend.security.PersonDetails;

@Service
public class AuthenticatedPersonService {
    public Person getAuthenticatedPerson() {
        PersonDetails personDetails = (PersonDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        return personDetails.getPerson();
    }
}
