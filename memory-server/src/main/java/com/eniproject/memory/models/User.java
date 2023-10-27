package com.eniproject.memory.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String username;

    @Column(
            unique = true
    )
    private String email;

    private String password;

    @OneToOne // Todo change relation for @ManyToOne -> avoid to save many times the sime memory in database
    private Memory preferences;

    @OneToMany
    private List<Score> scores;

}
