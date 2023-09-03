package pl.polsl.tab.goji.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.polsl.tab.goji.model.entity.Issue;
import pl.polsl.tab.goji.model.entity.Task;

import java.util.List;
import java.util.Optional;


public interface IssueRepository extends JpaRepository<Issue, Long>{

    Optional<Issue> findIssueByIssueId(Long issueId);

    Optional<Issue> findIssueByIssueName(String issueName);

    @Query(value = "SELECT * FROM issue where request_id = ?1 ORDER BY issue_id ASC ",nativeQuery = true)
    List<Issue> findAllIssuesFromRequest(Long requestId);

    @Query(value = "select * from issue where user_id=?1",nativeQuery = true)
    List<Issue> findIssuesForUser(Long userId);
}
