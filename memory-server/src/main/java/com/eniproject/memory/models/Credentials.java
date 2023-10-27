package com.eniproject.memory.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class Credentials {
    private String email;

    private String password;
}
