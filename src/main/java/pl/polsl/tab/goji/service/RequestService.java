package pl.polsl.tab.goji.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.tab.goji.mappers.RequestMapper;
import pl.polsl.tab.goji.model.dto.read.RequestReadModel;
import pl.polsl.tab.goji.model.dto.write.RequestWriteModel;
import pl.polsl.tab.goji.model.entity.Product;
import pl.polsl.tab.goji.model.entity.Request;
import pl.polsl.tab.goji.model.enums.Status;
import pl.polsl.tab.goji.repository.RequestRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
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
        Set<Request> requests = product.getRequests();
        requests.add(request);
        product.setRequests(requests);
        request.setProduct(product);
        request.setStatus(Status.OPEN);

        return  requestMapper.toReadModel(requestRepository.save(request));
    }

    public RequestReadModel setRequestStatusClosed(Long requestId,String result){
        Optional<Request> request = requestRepository.findRequestByRequestId(requestId);
        Request requestToUpdate = new Request();
        if(request.isPresent()){

            requestToUpdate = request.get();
            requestToUpdate.setStatus(Status.CLOSED);
            if (result == null || result.isEmpty()) {
                requestToUpdate.setResult("Not given");
            } else {
                System.out.println(result);
                requestToUpdate.setResult(result);
            }
            requestToUpdate.setFinalizationDate(LocalDateTime.now());
            requestToUpdate = requestRepository.save(requestToUpdate);
        }
        return requestMapper.toReadModel(requestToUpdate);
    }

    public RequestReadModel setRequestStatusOpen(Long requestId){
        Optional<Request> request = requestRepository.findRequestByRequestId(requestId);
        Request requestToUpdate = new Request();
        if(request.isPresent()){

            requestToUpdate = request.get();
            requestToUpdate.setStatus(Status.OPEN);
            requestToUpdate.setOpenDate(LocalDateTime.now());
            requestToUpdate = requestRepository.save(requestToUpdate);
        }
        return requestMapper.toReadModel(requestToUpdate);
    }

    public RequestReadModel setRequestStatusInProgress(Long requestId){
        Optional<Request> request = requestRepository.findRequestByRequestId(requestId);
        Request requestToUpdate = new Request();
        if(request.isPresent()){

            requestToUpdate = request.get();
            requestToUpdate.setStatus(Status.IN_PROGRESS);
            requestToUpdate.setInProgressDate(LocalDateTime.now());
            requestToUpdate = requestRepository.save(requestToUpdate);
        }
        return requestMapper.toReadModel(requestToUpdate);
    }

    public RequestReadModel updateRequest(Long requestId,RequestWriteModel requestWriteModel){
        Optional<Request> request = requestRepository.findRequestByRequestId(requestId);
        Request requestToUpdate = new Request();
        if(request.isPresent()){
            requestToUpdate = request.get();
            requestToUpdate.setRequestName(requestWriteModel.getRequestName());
            requestToUpdate.setDescription(requestWriteModel.getDescription());
            requestToUpdate = requestRepository.save(requestToUpdate);
        }

        return requestMapper.toReadModel(requestToUpdate);
    }

    public List<RequestReadModel> getAllRequests(){
        return requestMapper.map(requestRepository.findAll());
    }

    public Request getRequestById(Long id){
        Optional<Request> request = requestRepository.findRequestByRequestId(id);
        return request.orElse(null);
    }

    public RequestReadModel getRequestReadModelById(Long id){
        Optional<Request> request = requestRepository.findRequestByRequestId(id);
        RequestReadModel requestReadModel = new RequestReadModel();
        if(request.isPresent()){
            requestReadModel=requestMapper.toReadModel(request.get());
        }
        return requestReadModel;
    }

}
