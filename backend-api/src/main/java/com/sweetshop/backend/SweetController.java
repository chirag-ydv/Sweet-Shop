package com.sweetshop.backend;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sweets")
@CrossOrigin(origins = "*") // Allow React to talk to Java
public class SweetController {
    @Autowired private SweetService service;

    @PostMapping
    public ResponseEntity<Sweet> createSweet(@RequestBody Sweet sweet) {
        return new ResponseEntity<>(service.addSweet(sweet), HttpStatus.CREATED);
    }

    @GetMapping
    public List<Sweet> getSweets() {
        return service.getAllSweets();
    }
}