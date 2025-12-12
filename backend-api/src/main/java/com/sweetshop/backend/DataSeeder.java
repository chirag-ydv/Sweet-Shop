package com.sweetshop.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private SweetRepository sweetRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if the database is empty
        if (sweetRepository.count() == 0) {
            System.out.println("🍬 Database is empty! Seeding default sweets...");

            Sweet s1 = new Sweet(null, "Laddoo", "Traditional", 15.0, 50);
            Sweet s2 = new Sweet(null, "Barfi", "Milk", 20.0, 30);
            Sweet s3 = new Sweet(null, "Jalebi", "Syrup", 10.0, 100);
            Sweet s4 = new Sweet(null, "Gulab Jamun", "Syrup", 25.0, 40);

            sweetRepository.saveAll(Arrays.asList(s1, s2, s3, s4));
            
            System.out.println("✅ Default sweets added!");
        }
    }
}