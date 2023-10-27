package com.eniproject.memory.services.impl;

import com.eniproject.memory.models.Score;
import com.eniproject.memory.repositories.ScoreRepository;
import com.eniproject.memory.services.MemoryService;
import com.eniproject.memory.services.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ScoreServiceImpl implements ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;

    @Autowired
    private MemoryService memoryService;

    @Override
    public List<Score> saveAll(List<Score> scores) {
        for(Score score: scores) {
            memoryService.save(score.getMemory());
            score.setCreatedDate(LocalDate.now());
        }
        return scoreRepository.saveAll(scores);
    }
}
