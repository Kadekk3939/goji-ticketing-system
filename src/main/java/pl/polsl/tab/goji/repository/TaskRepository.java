package pl.polsl.tab.goji.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.polsl.tab.goji.model.entity.Request;
import pl.polsl.tab.goji.model.entity.Task;

import java.util.List;
import java.util.Optional;


public interface TaskRepository extends JpaRepository<Task, Long>{

    Optional<Task> findTaskByTaskId(Long taskId);

    Optional<Task> findTaskByTaskName(String taskName);

    @Query(value = "SELECT * FROM task where issue_id = ?1 ORDER BY task_id ASC",nativeQuery = true)
    List<Task> findAllTasksFromIssue(Long issueId);
}