package pl.polsl.tab.goji.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.tab.goji.mappers.IssueMapper;
import pl.polsl.tab.goji.mappers.RequestMapper;
import pl.polsl.tab.goji.mappers.TaskMapper;
import pl.polsl.tab.goji.model.dto.read.IssueReadModel;
import pl.polsl.tab.goji.model.dto.read.ProductReadModel;
import pl.polsl.tab.goji.model.dto.read.RequestReadModel;
import pl.polsl.tab.goji.model.dto.read.TaskReadModel;
import pl.polsl.tab.goji.model.dto.write.IssueWriteModel;
import pl.polsl.tab.goji.model.entity.Issue;
import pl.polsl.tab.goji.model.entity.Product;
import pl.polsl.tab.goji.model.entity.Request;
import pl.polsl.tab.goji.model.entity.Task;
import pl.polsl.tab.goji.model.enums.Status;
import pl.polsl.tab.goji.repository.IssueRepository;
import pl.polsl.tab.goji.repository.TaskRepository;
import pl.polsl.tab.goji.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class IssueService {
    private final IssueMapper issueMapper;
    private final IssueRepository issueRepository;
    private final RequestService requestService;
    private final RequestMapper requestMapper;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    @Autowired
    public IssueService(IssueMapper issueMapper, IssueRepository issueRepository, RequestService requestService, UserRepository userRepository,TaskRepository taskRepository,
                        TaskMapper taskMapper,RequestMapper requestMapper){
        this.issueMapper = issueMapper;
        this.issueRepository = issueRepository;
        this.requestService = requestService;
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
        this.requestMapper=requestMapper;
    }

    public IssueReadModel addIssue(IssueWriteModel issueWriteModel){
        Issue issue = issueMapper.toEntity(issueWriteModel);
        Request request = requestService.getRequestById(issueWriteModel.getRequestId());
        Set<Issue> issues = request.getIssues();
        issue.setRequest(request);
        issue.setStatus(Status.OPEN);
        if(!issueWriteModel.getResponsibleUser().isEmpty())
            issue.setResponsiblePerson(userRepository.findUserByLogin(issueWriteModel.getResponsibleUser()).get());
        issues.add(issue);
        issueRepository.save(issue);
        request.setIssues(issues);

        return  issueMapper.toReadModel(issue);

    }

    public IssueReadModel updateIssue(Long issueId,IssueWriteModel issueWriteModel){
        Optional<Issue> issue = issueRepository.findIssueByIssueId(issueId);
        Issue issueToUpdate = new Issue();
        if(issue.isPresent()){
            issueToUpdate = issue.get();
            issueToUpdate.setIssueName(issueWriteModel.getIssueName());
            issueToUpdate.setDescription(issueWriteModel.getDescription());
            issueToUpdate.setType(issueWriteModel.getType());
            if(!issueWriteModel.getResponsibleUser().isEmpty())
                issueToUpdate.setResponsiblePerson(userRepository.findUserByLogin(issueWriteModel.getResponsibleUser()).get());
            else
                issueToUpdate.setResponsiblePerson(null);
            issueToUpdate = issueRepository.save(issueToUpdate);
        }
        return issueMapper.toReadModel(issueToUpdate);
    }

    public IssueReadModel setIssueStatusClosed(Long issueId,String result){
        Optional<Issue> issue = issueRepository.findIssueByIssueId(issueId);
        Issue issueToUpdate = new Issue();
        if(issue.isPresent()){
            issueToUpdate = issue.get();
            issueToUpdate.setStatus(Status.CLOSED);
            if (result == null || result.isEmpty()) {
                issueToUpdate.setResult("Not given");
            } else {
                System.out.println(result);
                issueToUpdate.setResult(result);
            }
            issueToUpdate.setFinalizationDate(LocalDateTime.now());
            issueToUpdate = issueRepository.save(issueToUpdate);
        }
        return issueMapper.toReadModel(issueToUpdate);
    }

    public IssueReadModel setIssueStatusCancel(Long issueId,String result){
        Optional<Issue> issue = issueRepository.findIssueByIssueId(issueId);
        Issue issueToUpdate = new Issue();
        if(issue.isPresent()){
            issueToUpdate = issue.get();
            issueToUpdate.setStatus(Status.CANCEL);
            if (result == null || result.isEmpty()) {
                issueToUpdate.setResult("Not given");
            } else {
                System.out.println(result);
                issueToUpdate.setResult(result);
            }
            issueToUpdate.setFinalizationDate(LocalDateTime.now());
            issueToUpdate = issueRepository.save(issueToUpdate);
        }
        return issueMapper.toReadModel(issueToUpdate);
    }

    public IssueReadModel setIssueStatusOpen(Long issueId){
        Optional<Issue> issue = issueRepository.findIssueByIssueId(issueId);
        Issue issueToUpdate = new Issue();
        if(issue.isPresent()){
            issueToUpdate = issue.get();
            issueToUpdate.setStatus(Status.OPEN);
            issueToUpdate.setOpenDate(LocalDateTime.now());
            issueToUpdate = issueRepository.save(issueToUpdate);
        }
        return issueMapper.toReadModel(issueToUpdate);
    }

    public IssueReadModel setIssueStatusInProgress(Long issueId,String userLogin){
        Optional<Issue> issue = issueRepository.findIssueByIssueId(issueId);
        Issue issueToUpdate = new Issue();
        if(issue.isPresent()){
            issueToUpdate = issue.get();
            issueToUpdate.setStatus(Status.IN_PROGRESS);
            issueToUpdate.setResponsiblePerson(userRepository.findUserByLogin(userLogin).get());
            issueToUpdate.setInProgressDate(LocalDateTime.now());
            issueToUpdate = issueRepository.save(issueToUpdate);
        }
        return issueMapper.toReadModel(issueToUpdate);
    }

    public List<IssueReadModel> getAllIssues(){
        return issueMapper.map(issueRepository.findAll());
    }

    public Issue getIssueById(Long id){
        Optional<Issue> issue = issueRepository.findIssueByIssueId(id);
        return issue.orElse(null);
    }

    public IssueReadModel getIssueReadModelById(Long id){
        Optional<Issue> issue = issueRepository.findIssueByIssueId(id);
        IssueReadModel issueReadModel = new IssueReadModel();
        if(issue.isPresent()){
            issueReadModel = issueMapper.toReadModel(issue.get());
        }
        return issueReadModel;
    }

    public List<TaskReadModel> getSubTusks(Long id){
        List<Task> tasks = taskRepository.findAllTasksFromIssue(id);
        return taskMapper.map(tasks);
    }

    public RequestReadModel getParentRequest(Long id){
        Request request = issueRepository.findIssueByIssueId(id).get().getRequest();
        return requestMapper.toReadModel(request);
    }

    public List<IssueReadModel>getIssuesForUser(Long userId){
        List<Issue> issues = issueRepository.findIssuesForUser(userId);
        return issueMapper.map(issues);
    }

    public void responsibleUserDisactivate(Long userId){
        List<Issue> issues = issueRepository.findIssuesForUser(userId);
        for(Issue issue:issues){
            if(issue.getStatus()==Status.IN_PROGRESS){
                issue.setResponsiblePerson(null);
                issueRepository.save(issue);
            }
        }
    }
}
