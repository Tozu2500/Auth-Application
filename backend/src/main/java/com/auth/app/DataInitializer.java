package com.auth.app;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.auth.app.entity.Role;
import com.auth.app.entity.User;
import com.auth.app.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.existsByUsername("testuser")) return;

        User user = User.builder()
                .username("testuser")
                .email("test@example.com")
                .password(passwordEncoder.encode("password123"))
                .firstName("Test")
                .lastName("User")
                .role(Role.ROLE_USER)
                .enabled(true)
                .accountNonLocked(true)
                .build();

        User admin = User.builder()
                .username("admin")
                .email("admin@example.com")
                .password(passwordEncoder.encode("admin123"))
                .firstName("Admin")
                .lastName("User")
                .role(Role.ROLE_ADMIN)
                .enabled(true)
                .accountNonLocked(true)
                .build();

        userRepository.save(user);
        if (!userRepository.existsByUsername("admin")) userRepository.save(admin);
    }
}