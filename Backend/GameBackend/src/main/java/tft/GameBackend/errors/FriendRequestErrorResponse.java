package tft.GameBackend.errors;

public class FriendRequestErrorResponse {
    private String message;
    private long timestamp;

    public FriendRequestErrorResponse(String message) {
        this.message = message;
        timestamp = System.currentTimeMillis();
    }
}
