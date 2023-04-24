package pl.polsl.tab.goji.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.polsl.tab.goji.model.entity.Task;

import java.util.Optional;


public interface TaskRepository extends JpaRepository<Task, Long>{

    Optional<Task> findTaskByTaskId(Long taskId);

    Optional<Task> findTaskByTaskName(String taskName);
}