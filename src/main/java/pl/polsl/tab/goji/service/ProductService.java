package pl.polsl.tab.goji.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.tab.goji.mappers.ProductMapper;
import pl.polsl.tab.goji.mappers.RequestMapper;
import pl.polsl.tab.goji.model.dto.read.ProductReadModel;
import pl.polsl.tab.goji.model.dto.read.RequestReadModel;
import pl.polsl.tab.goji.model.dto.read.TaskReadModel;
import pl.polsl.tab.goji.model.dto.write.ProductWriteModel;
import pl.polsl.tab.goji.model.entity.Client;
import pl.polsl.tab.goji.model.entity.Product;
import pl.polsl.tab.goji.model.entity.Request;
import pl.polsl.tab.goji.model.entity.Task;
import pl.polsl.tab.goji.repository.ClientRepository;
import pl.polsl.tab.goji.repository.ProductRepository;
import pl.polsl.tab.goji.repository.RequestRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ProductService {
    private final ProductMapper productMapper;
    private final ProductRepository productRepository;
    private final ClientService clientService;
    private final RequestMapper requestMapper;
    private final RequestRepository requestRepository;

    @Autowired
    public ProductService(ProductMapper productMapper,ProductRepository productRepository,ClientService clientService,RequestRepository requestRepository,RequestMapper requestMapper){
        this.productMapper = productMapper;
        this.productRepository = productRepository;
        this.clientService = clientService;
        this.requestMapper=requestMapper;
        this.requestRepository=requestRepository;
    }

    public ProductReadModel addProduct(ProductWriteModel productWriteModel){
        Product product = productMapper.toEntity(productWriteModel);
        Client client = clientService.getClientActionEntityById(productWriteModel.getClientId());
        Set<Product> products = client.getProducts();
        product.setClient(client);
        products.add(product);
        productRepository.save(product);
        client.setProducts(products);

        return  productMapper.toReadModel(product);
    }

    public Product getProductById(Long id) {
        Optional<Product> product = productRepository.findProductByProductId(id);
        return product.orElse(null);
    }

    public List<ProductReadModel> getAllProducts(){
        return productMapper.map(productRepository.findAll());
    }

    public List<RequestReadModel> getSubRequests(Long id){
        List<Request> requests = requestRepository.findAllRequestsFromProduct(id);
        return requestMapper.map(requests);
    }
}
