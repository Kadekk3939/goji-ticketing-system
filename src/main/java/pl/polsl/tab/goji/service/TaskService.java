package pl.polsl.tab.goji.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import pl.polsl.tab.goji.mappers.TaskMapper;
import pl.polsl.tab.goji.model.dto.read.TaskReadModel;
import pl.polsl.tab.goji.model.dto.write.TaskWriteModel;
import pl.polsl.tab.goji.model.entity.Issue;
import pl.polsl.tab.goji.model.entity.Task;
import pl.polsl.tab.goji.model.entity.User;
import pl.polsl.tab.goji.model.enums.Status;
import pl.polsl.tab.goji.repository.TaskRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class TaskService {

    private final TaskMapper taskMapper;
    private final TaskRepository taskRepository;
    private final IssueService issueService;

    @Autowired
    public TaskService(TaskMapper taskMapper,TaskRepository taskRepository,IssueService issueService){
        this.taskMapper = taskMapper;
        this.taskRepository = taskRepository;
        this.issueService = issueService;
    }

    public TaskReadModel addTask(TaskWriteModel taskWriteModel){
        Task task = taskMapper.toEntity(taskWriteModel);
        Issue issue = issueService.getIssueById(taskWriteModel.getIssueId());
        Set<Task> tasks = issue.getTasks();
        tasks.add(task);
        issue.setTasks(tasks);
        task.setIssue(issue);
        task.setStatus(Status.OPEN);


        return taskMapper.toReadModel(taskRepository.save(task));
    }

    public TaskReadModel taskUpdate(Long taskId,TaskWriteModel taskWriteModel){
        Optional<Task> task = taskRepository.findTaskByTaskId(taskId);
        Task taskToUpdate = new Task();
        if(task.isPresent()){
            taskToUpdate = task.get();
            taskToUpdate.setTaskName(taskWriteModel.getTaskName());
            taskToUpdate.setDescription(taskWriteModel.getDescription());
            taskToUpdate = taskRepository.save(taskToUpdate);
        }
        return taskMapper.toReadModel(taskToUpdate);
    }

    public List<TaskReadModel> getAllTasks(){
        return taskMapper.map(taskRepository.findAll());
    }

    public TaskReadModel getTaskReadModelById(Long taskId){
        Optional<Task> task = taskRepository.findTaskByTaskId(taskId);
        TaskReadModel taskReadModel = new TaskReadModel();
        if(task.isPresent()){
            taskReadModel = taskMapper.toReadModel(task.get());
        }
        return taskReadModel;
    }

}
