package tft.GameBackend.errors;

import tft.GameBackend.entities.Person;

public class PersonNotFoundException extends Exception{
    public PersonNotFoundException(String message) {
        super(message);
    }
}
