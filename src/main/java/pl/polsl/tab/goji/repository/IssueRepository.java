package pl.polsl.tab.goji.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.polsl.tab.goji.model.entity.Issue;

import java.util.Optional;


public interface IssueRepository extends JpaRepository<Issue, Long>{

    Optional<Issue> findIssueByIssueId(Long issueId);

    Optional<Issue> findIssueByIssueName(String issueName);
}
