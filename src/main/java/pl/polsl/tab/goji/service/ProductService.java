package pl.polsl.tab.goji.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.tab.goji.mappers.ProductMapper;
import pl.polsl.tab.goji.repository.ProductRepository;

@Service
public class ProductService {
    private final ProductMapper productMapper;
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductMapper productMapper,ProductRepository productRepository){
        this.productMapper = productMapper;
        this.productRepository = productRepository;
    }
}
