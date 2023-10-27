package com.eniproject.memory.controllers;

import com.eniproject.memory.models.Credentials;
import com.eniproject.memory.models.User;
import com.eniproject.memory.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @GetMapping("/{id}")
    public ResponseEntity<User> findUser(@PathVariable("id") Integer id) {
        Optional<User> user = userService.findById(id);

        if(user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/email")
    public ResponseEntity<User> findByMail(@RequestBody String email) {
        Optional<User> user = userService.findByEmail(email);

        if(user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        User updatedUser = userService.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/auth")
    public ResponseEntity<User> authenticate(@RequestBody Credentials credentials) {
        Optional<User> userOptional = userService.findByEmail(credentials.getEmail());

        if(userOptional.isPresent()) {
            User user = userOptional.get();
            if(passwordEncoder.matches(credentials.getPassword(), user.getPassword())) {
                return new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User savedUser = userService.register(user);
        return ResponseEntity.ok(savedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Integer> deleteUser(@PathVariable("id") int id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(id);
    }
}
