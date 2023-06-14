package pl.polsl.tab.goji.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.tab.goji.mappers.RequestMapper;
import pl.polsl.tab.goji.model.dto.read.ProductReadModel;
import pl.polsl.tab.goji.model.dto.read.RequestReadModel;
import pl.polsl.tab.goji.model.dto.write.RequestWriteModel;
import pl.polsl.tab.goji.model.entity.Product;
import pl.polsl.tab.goji.model.entity.Request;
import pl.polsl.tab.goji.model.enums.RequestStatus;
import pl.polsl.tab.goji.repository.RequestRepository;

import java.util.List;
import java.util.Set;

@Service
public class RequestService {
    private final RequestMapper requestMapper;
    private final RequestRepository requestRepository;
    private final ProductService productService;

    @Autowired
    public RequestService(RequestRepository requestRepository,RequestMapper requestMapper, ProductService productService){
        this.productService = productService;
        this.requestMapper = requestMapper;
        this.requestRepository = requestRepository;
    }

    public RequestReadModel addRequest(RequestWriteModel requestWriteModel){
        Request request = requestMapper.toEntity(requestWriteModel);
        Product product = productService.getProductById(requestWriteModel.getProductId());
        Set<Request> requestSet = product.getRequests();
        requestSet.add(request);
        product.setRequests(requestSet);
        request.setProduct(product);
        request.setStatus(RequestStatus.OPEN);

        return  requestMapper.toReadModel(requestRepository.save(request));
    }

    public List<RequestReadModel> getAllRequests(){
        return requestMapper.map(requestRepository.findAll());
    }

}
