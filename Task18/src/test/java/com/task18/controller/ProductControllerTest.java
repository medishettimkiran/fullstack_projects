package com.task18.controller;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.task18.model.Product;
import com.task18.service.ProductService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class ProductControllerTest {

    ProductService service = Mockito.mock(ProductService.class);
    MockMvc mockMvc = MockMvcBuilders.standaloneSetup(new ProductController(service)).build();

    @Test
    void testCreate() throws Exception {
        Product p = new Product("Pen", 10);
        Mockito.when(service.save(Mockito.any())).thenReturn(p);

        mockMvc.perform(post("/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(p)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Pen"));
    }
}