package tft.GameBackend.errors;

public class LevelErrorResponse {
    private String message;
    private long timestamp;

    public LevelErrorResponse(String message) {
        this.message = message;
        timestamp = System.currentTimeMillis();
    }
}
