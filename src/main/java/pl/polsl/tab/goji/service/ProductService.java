package pl.polsl.tab.goji.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.tab.goji.mappers.ProductMapper;
import pl.polsl.tab.goji.model.dto.read.ProductReadModel;
import pl.polsl.tab.goji.model.dto.write.ProductWriteModel;
import pl.polsl.tab.goji.model.entity.Client;
import pl.polsl.tab.goji.model.entity.Product;
import pl.polsl.tab.goji.repository.ClientRepository;
import pl.polsl.tab.goji.repository.ProductRepository;

import java.util.Set;

@Service
public class ProductService {
    private final ProductMapper productMapper;
    private final ProductRepository productRepository;
    private final ClientService clientService;

    @Autowired
    public ProductService(ProductMapper productMapper,ProductRepository productRepository,ClientService clientService){
        this.productMapper = productMapper;
        this.productRepository = productRepository;
        this.clientService = clientService;
    }

    public ProductReadModel addProduct(ProductWriteModel productWriteModel){
        Product product = productMapper.toEntity(productWriteModel);
        Client client = clientService.getClientActionEntityById(productWriteModel.getClientId());
        Set<Product> products = client.getProducts();
        products.add(product);
        client.setProducts(products);
        product.setClient(client);

        return  productMapper.toReadModel(productRepository.save(product));
    }
}
