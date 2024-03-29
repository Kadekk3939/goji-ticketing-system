package pl.polsl.tab.goji.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.tab.goji.mappers.IssueMapper;
import pl.polsl.tab.goji.mappers.ProductMapper;
import pl.polsl.tab.goji.mappers.RequestMapper;
import pl.polsl.tab.goji.model.dto.read.IssueReadModel;
import pl.polsl.tab.goji.model.dto.read.ProductReadModel;
import pl.polsl.tab.goji.model.dto.read.RequestReadModel;
import pl.polsl.tab.goji.model.dto.read.TaskReadModel;
import pl.polsl.tab.goji.model.dto.write.RequestWriteModel;
import pl.polsl.tab.goji.model.entity.Issue;
import pl.polsl.tab.goji.model.entity.Product;
import pl.polsl.tab.goji.model.entity.Request;
import pl.polsl.tab.goji.model.entity.Task;
import pl.polsl.tab.goji.model.enums.Status;
import pl.polsl.tab.goji.repository.IssueRepository;
import pl.polsl.tab.goji.repository.RequestRepository;
import pl.polsl.tab.goji.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class RequestService {
    private final RequestMapper requestMapper;
    private final IssueMapper issueMapper;
    private final RequestRepository requestRepository;
    private final IssueRepository issueRepository;
    private final ProductService productService;
    private final UserRepository userRepository;
    private final ProductMapper productMapper;

    @Autowired
    public RequestService(RequestRepository requestRepository,RequestMapper requestMapper, ProductService productService,
                          UserRepository userRepository,IssueMapper issueMapper,IssueRepository issueRepository,
                          ProductMapper productMapper){
        this.productService = productService;
        this.requestMapper = requestMapper;
        this.requestRepository = requestRepository;
        this.userRepository = userRepository;
        this.issueMapper = issueMapper;
        this.issueRepository = issueRepository;
        this.productMapper = productMapper;
    }

    public RequestReadModel addRequest(RequestWriteModel requestWriteModel){
        Request request = requestMapper.toEntity(requestWriteModel);
        Product product = productService.getProductById(requestWriteModel.getProductId());
        Set<Request> requests = product.getRequests();
        requests.add(request);
        product.setRequests(requests);
        request.setProduct(product);
        request.setStatus(Status.OPEN);
        if(!requestWriteModel.getResponsibleUser().isEmpty())
            request.setResponsiblePerson(userRepository.findUserByLogin(requestWriteModel.getResponsibleUser()).get());

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

    public RequestReadModel setRequestStatusInProgress(Long requestId,String userLogin){
        Optional<Request> request = requestRepository.findRequestByRequestId(requestId);
        Request requestToUpdate = new Request();
        if(request.isPresent()){

            requestToUpdate = request.get();
            requestToUpdate.setStatus(Status.IN_PROGRESS);
            requestToUpdate.setResponsiblePerson(userRepository.findUserByLogin(userLogin).get());
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
            if(!requestWriteModel.getResponsibleUser().isEmpty())
                requestToUpdate.setResponsiblePerson(userRepository.findUserByLogin(requestWriteModel.getResponsibleUser()).get());
            else
                requestToUpdate.setResponsiblePerson(null);
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

    public List<IssueReadModel> getSubIssues(Long id){
        List<Issue> issues = issueRepository.findAllIssuesFromRequest(id);
        return issueMapper.map(issues);
    }

    public ProductReadModel getParentProduct(Long requestId){
        Product product = requestRepository.findRequestByRequestId(requestId).get().getProduct();
        return productMapper.toReadModel(product);
    }

    public List<RequestReadModel>getRequestsForUser(Long userId){
        List<Request> requests = requestRepository.findRequestsForUser(userId);
        return requestMapper.map(requests);
    }

    public void responsibleUserDisactivate(Long userId){
        List<Request> requests = requestRepository.findRequestsForUser(userId);
        for(Request request:requests){
            if(request.getStatus()==Status.IN_PROGRESS){
                request.setResponsiblePerson(null);
                requestRepository.save(request);
            }
        }
    }

    public RequestReadModel setRequestStatusCancel(Long requestId,String result){
        Optional<Request> request = requestRepository.findRequestByRequestId(requestId);
        Request requestToUpdate = new Request();
        if(request.isPresent()){

            requestToUpdate = request.get();
            requestToUpdate.setStatus(Status.CANCEL);
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
}

