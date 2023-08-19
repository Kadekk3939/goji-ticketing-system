package pl.polsl.tab.goji.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.tab.goji.model.dto.read.IssueReadModel;
import pl.polsl.tab.goji.model.dto.read.RequestReadModel;
import pl.polsl.tab.goji.model.dto.write.IssueWriteModel;
import pl.polsl.tab.goji.model.dto.write.RequestWriteModel;
import pl.polsl.tab.goji.service.IssueService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/issue")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService){this.issueService = issueService;}

    @PostMapping
    public ResponseEntity<IssueReadModel> addIssue(@RequestBody IssueWriteModel issueWriteModel){
        return new ResponseEntity<>(issueService.addIssue(issueWriteModel), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<IssueReadModel>> getAllIssues(){
        return new ResponseEntity<>(issueService.getAllIssues(),HttpStatus.OK);
    }

    @PutMapping("/{issueId}")
    public ResponseEntity<IssueReadModel> updateIssue(@PathVariable Long issueId, @RequestBody IssueWriteModel issueWriteModel) {
        IssueReadModel updateIssue = issueService.updateIssue(issueId, issueWriteModel);
        return ResponseEntity.ok(updateIssue);
    }

    @GetMapping("/{issueId}")
    public ResponseEntity<IssueReadModel> getIssueById(@PathVariable Long issueId) {
        IssueReadModel issueReadModel = issueService.getIssueReadModelById(issueId);
        return ResponseEntity.ok(issueReadModel);
    }

    @GetMapping("/{issueId}/close")
    public ResponseEntity<IssueReadModel> setIssueStatusClosed(@PathVariable Long issueId) {
        IssueReadModel issueReadModel = issueService.setIssueStatusClosed(issueId);
        return ResponseEntity.ok(issueReadModel);
    }

    @GetMapping("/{issueId}/open")
    public ResponseEntity<IssueReadModel> setIssueStatusOpen(@PathVariable Long issueId) {
        IssueReadModel issueReadModel = issueService.setIssueStatusOpen(issueId);
        return ResponseEntity.ok(issueReadModel);
    }

    @GetMapping("/{issueId}/inProgress")
    public ResponseEntity<IssueReadModel> setIssueStatusInProgress(@PathVariable Long issueId) {
        IssueReadModel issueReadModel = issueService.setIssueStatusInProgress(issueId);
        return ResponseEntity.ok(issueReadModel);
    }
}
