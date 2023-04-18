package tft.GameBackend.errors;

public class PersonErrorResponse {
    private String message;
    private Long timestamp;

    public PersonErrorResponse(String message) {
        this.message = message;
        timestamp = System.currentTimeMillis();
    }
}
