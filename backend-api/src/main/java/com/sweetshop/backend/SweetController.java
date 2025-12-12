package com.sweetshop.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/sweets")
@CrossOrigin(origins = "*")
public class SweetController {

    @Autowired private SweetRepository repository;

    // GET ALL
    @GetMapping
    public List<Sweet> getAll() {
        return repository.findAll();
    }

    // SEARCH (By name or category)
    @GetMapping("/search")
    public List<Sweet> search(@RequestParam String query) {
        // NOTE: For simplicity, we are filtering in Java. Ideally use a custom Query in Repository.
        return repository.findAll().stream()
                .filter(s -> s.getName().toLowerCase().contains(query.toLowerCase()))
                .toList();
    }

    // CREATE (Admin Only in real app)
    @PostMapping
    public Sweet create(@RequestBody Sweet sweet) {
        return repository.save(sweet);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Sweet update(@PathVariable Long id, @RequestBody Sweet sweetDetails) {
        Sweet sweet = repository.findById(id).orElseThrow();
        sweet.setName(sweetDetails.getName());
        sweet.setPrice(sweetDetails.getPrice());
        sweet.setQuantity(sweetDetails.getQuantity());
        return repository.save(sweet);
    }

    // DELETE (Admin Only)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }

    // PURCHASE (Logic: Decrease Quantity)
    @PostMapping("/{id}/purchase")
    public Sweet purchase(@PathVariable Long id) {
        Sweet sweet = repository.findById(id).orElseThrow();
        if (sweet.getQuantity() > 0) {
            sweet.setQuantity(sweet.getQuantity() - 1);
            return repository.save(sweet);
        } else {
            throw new RuntimeException("Out of stock!");
        }
    }
}