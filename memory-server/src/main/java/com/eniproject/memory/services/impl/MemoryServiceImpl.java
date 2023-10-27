package com.eniproject.memory.services.impl;

import com.eniproject.memory.models.Memory;
import com.eniproject.memory.repositories.MemoryRepository;
import com.eniproject.memory.services.MemoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemoryServiceImpl implements MemoryService {

    @Autowired
    private MemoryRepository memoryRepository;

    @Override
    public Memory save(Memory memory) {
        // Todo ckeck is memory already exist in database before saving
        return memoryRepository.save(memory);
    }

    @Override
    public Optional<Memory> findByNameAndSize(Memory memory) {
        return memoryRepository.findByNameAndSize(memory.getName(), memory.getSize());
    }
}
