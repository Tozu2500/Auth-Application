package com.auth.app.dto.response;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MessageResponse {

    private String message;
    private boolean success;
    private LocalDateTime timestamp;

    public static MessageResponse success(String message) {
        return MessageResponse.builder()
            .message(message)
            .success(true)
            .timestamp(LocalDateTime.now())
            .build();
    }

    public static MessageResponse error(String message) {
        return MessageResponse.builder()
            .message(message)
            .success(false)
            .timestamp(LocalDateTime.now())
            .build();
    }
}
