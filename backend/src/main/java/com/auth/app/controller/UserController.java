package com.auth.app.controller;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth.app.dto.request.ChangePasswordRequest;
import com.auth.app.dto.response.MessageResponse;
import com.auth.app.dto.response.UserResponse;
import com.auth.app.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(Principal principal) {
        UserResponse response = userService.getUserProfile(principal.getName());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/change-password")
    public ResponseEntity<MessageResponse> changePassword(
        Principal principal,
        @Valid @RequestBody ChangePasswordRequest request
    ) {
        userService.changePassword(principal.getName(), request);
        return ResponseEntity.ok(MessageResponse.success("Password changed successfully"));
    }

}
