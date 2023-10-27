package com.eniproject.memory.services;

import com.eniproject.memory.models.Score;

import java.util.List;

public interface ScoreService {
    List<Score> saveAll(List<Score> scores);
}
