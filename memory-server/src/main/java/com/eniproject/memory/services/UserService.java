package com.eniproject.memory.services;

import com.eniproject.memory.models.Credentials;
import com.eniproject.memory.models.User;

import java.util.Optional;

public interface UserService {

    User save(User user);

    User register(User user);

    Optional<User> findById(Integer id);

    Optional<User> findByEmail(String email);

    Optional<User> findByCredentials(Credentials credentials);

    void deleteUser(Integer id);
}
