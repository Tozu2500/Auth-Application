package com.auth.app.controller;

import com.auth.app.dto.response.MessageResponse;
import com.auth.app.dto.response.UserResponse;
import com.auth.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/users/{userId}/toggle-enabled")
    public ResponseEntity<UserResponse> toggleUserEnabled(@PathVariable Long userId) {
        UserResponse response = userService.toggleUserEnabled(userId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/users/{userId}/toggle-lock")
    public ResponseEntity<UserResponse> toggleUserLock(@PathVariable Long userId) {
        UserResponse response = userService.toggleUserLock(userId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/users/{userId}/role")
    public ResponseEntity<UserResponse> changeUserRole(
        @PathVariable Long userId,
        @RequestParam String role
    ) {
        UserResponse response = userService.changeUserRole(userId, role);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<MessageResponse> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok(MessageResponse.success("User deleted successfully"));
    }
}
