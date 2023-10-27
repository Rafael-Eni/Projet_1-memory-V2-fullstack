package com.eniproject.memory.repositories;

import com.eniproject.memory.models.Memory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemoryRepository extends JpaRepository<Memory, Integer> {

    Optional<Memory> findByNameAndSize(String name, String size);
}
