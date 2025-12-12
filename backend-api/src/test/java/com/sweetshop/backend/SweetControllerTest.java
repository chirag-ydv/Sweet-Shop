package com.sweetshop.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(SweetController.class) // Error here is expected!
public class SweetControllerTest {

    @Autowired private MockMvc mockMvc;
    @MockBean private SweetService sweetService; // Error expected
    @Autowired private ObjectMapper objectMapper;

    @Test
    public void shouldCreateNewSweet() throws Exception {
        Sweet sweet = new Sweet(1L, "Ladoo", "Traditional", 10.0, 50);        
        when(sweetService.addSweet(any(Sweet.class))).thenReturn(sweet);

        mockMvc.perform(post("/api/sweets")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(sweet)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Ladoo"));
    }
}