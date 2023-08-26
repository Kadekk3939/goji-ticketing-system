package pl.polsl.tab.goji.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.tab.goji.mappers.IssueMapper;
import pl.polsl.tab.goji.model.dto.read.IssueReadModel;
import pl.polsl.tab.goji.model.dto.read.ProductReadModel;
import pl.polsl.tab.goji.model.dto.write.IssueWriteModel;
import pl.polsl.tab.goji.model.entity.Issue;
import pl.polsl.tab.goji.model.entity.Product;
import pl.polsl.tab.goji.model.entity.Request;
import pl.polsl.tab.goji.model.enums.Status;
import pl.polsl.tab.goji.repository.IssueRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class IssueService {
    private final IssueMapper issueMapper;
    private final IssueRepository issueRepository;
    private final RequestService requestService;

    @Autowired
    public IssueService(IssueMapper issueMapper,IssueRepository issueRepository,RequestService requestService){
        this.issueMapper = issueMapper;
        this.issueRepository = issueRepository;
        this.requestService = requestService;
    }

    public IssueReadModel addIssue(IssueWriteModel issueWriteModel){
        Issue issue = issueMapper.toEntity(issueWriteModel);
        Request request = requestService.getRequestById(issueWriteModel.getRequestId());
        Set<Issue> issues = request.getIssues();
        issue.setRequest(request);
        issue.setStatus(Status.OPEN);
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
            issueToUpdate = issueRepository.save(issueToUpdate);
        }
        return issueMapper.toReadModel(issueToUpdate);
    }

    public IssueReadModel setIssueStatusClosed(Long issueId){
        Optional<Issue> issue = issueRepository.findIssueByIssueId(issueId);
        Issue issueToUpdate = new Issue();
        if(issue.isPresent()){
            issueToUpdate = issue.get();
            issueToUpdate.setStatus(Status.CLOSED);
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

    public IssueReadModel setIssueStatusInProgress(Long issueId){
        Optional<Issue> issue = issueRepository.findIssueByIssueId(issueId);
        Issue issueToUpdate = new Issue();
        if(issue.isPresent()){
            issueToUpdate = issue.get();
            issueToUpdate.setStatus(Status.IN_PROGRESS);
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
}
