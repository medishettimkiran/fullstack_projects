package com.task18.repository;
import com.task18.model.Product;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class ProductRepositoryTest {

    @Autowired
    ProductRepository repository;

    @Test
    void testSaveAndFind() {
        Product p = new Product("Laptop", 50000);
        repository.save(p);
        assertFalse(repository.findAll().isEmpty());
    }
}