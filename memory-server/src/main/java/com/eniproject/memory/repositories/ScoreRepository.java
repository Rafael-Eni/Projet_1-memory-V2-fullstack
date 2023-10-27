package com.eniproject.memory.repositories;

import com.eniproject.memory.models.Score;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScoreRepository extends JpaRepository<Score, Integer> {
}
