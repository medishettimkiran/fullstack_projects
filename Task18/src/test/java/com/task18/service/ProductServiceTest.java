package com.task18.service;
import com.task18.model.Product;
import com.task18.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.util.Arrays;
import static org.junit.jupiter.api.Assertions.*;

class ProductServiceTest {

    ProductRepository repo = Mockito.mock(ProductRepository.class);
    ProductService service = new ProductService(repo);

    @Test
    void testSave() {
        Product p = new Product("Pen", 10);
        Mockito.when(repo.save(p)).thenReturn(p);
        assertEquals("Pen", service.save(p).getName());
    }

    @Test
    void testGetAll() {
        Mockito.when(repo.findAll()).thenReturn(Arrays.asList(new Product("Book", 50)));
        assertEquals(1, service.getAll().size());
    }
}