package com.eniproject.memory.services.impl;

import com.eniproject.memory.models.Credentials;
import com.eniproject.memory.models.User;
import com.eniproject.memory.repositories.UserRepository;
import com.eniproject.memory.services.MemoryService;
import com.eniproject.memory.services.ScoreService;
import com.eniproject.memory.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MemoryService memoryService;

    @Autowired
    private ScoreService scoreService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public User save(User user) {
        memoryService.save(user.getPreferences());
        scoreService.saveAll(user.getScores());
        return userRepository.save(user);
    }

    @Override
    public User register(User user) {
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        memoryService.save(user.getPreferences());
        scoreService.saveAll(user.getScores());
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findById(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findByCredentials(Credentials credentials) {
        return userRepository.findByEmailAndPassword(credentials.getEmail(), credentials.getPassword());
    }

    @Override
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }
}
