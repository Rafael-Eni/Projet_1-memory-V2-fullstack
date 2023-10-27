package com.eniproject.memory.services;

import com.eniproject.memory.models.Memory;

import java.util.Optional;

public interface MemoryService {
    Memory save(Memory memory);

    Optional<Memory> findByNameAndSize(Memory memory);

}
