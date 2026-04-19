package com.auth.app.exception;

public class TokenRefreshException extends RuntimeException {

    public TokenRefreshException(String token, String message) {
        super(String.format("Token refresh failed: %s", message));
    }

}
