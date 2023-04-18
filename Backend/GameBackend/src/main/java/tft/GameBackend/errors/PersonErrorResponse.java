package tft.GameBackend.errors;

public class PersonErrorResponse {
    private final String message;
    private final Long timestamp;

    public PersonErrorResponse(String message) {
        this.message = message;
        timestamp = System.currentTimeMillis();
    }
}
