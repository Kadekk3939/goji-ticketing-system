package pl.polsl.tab.goji.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import pl.polsl.tab.goji.mappers.IssueMapper;
import pl.polsl.tab.goji.mappers.TaskMapper;
import pl.polsl.tab.goji.model.dto.read.IssueReadModel;
import pl.polsl.tab.goji.model.dto.read.TaskReadModel;
import pl.polsl.tab.goji.model.dto.write.TaskWriteModel;
import pl.polsl.tab.goji.model.entity.Issue;
import pl.polsl.tab.goji.model.entity.Task;
import pl.polsl.tab.goji.model.entity.User;
import pl.polsl.tab.goji.model.enums.Status;
import pl.polsl.tab.goji.repository.IssueRepository;
import pl.polsl.tab.goji.repository.TaskRepository;
import pl.polsl.tab.goji.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

@Service
public class TaskService {

    private final TaskMapper taskMapper;
    private final TaskRepository taskRepository;
    private final IssueService issueService;
    private final UserRepository userRepository;
    private final IssueMapper issueMapper;
    private final IssueRepository issueRepository;

    @Autowired
    public TaskService(TaskMapper taskMapper,TaskRepository taskRepository
            ,IssueService issueService,UserRepository userRepository,IssueMapper issueMapper,
                       IssueRepository issueRepository){
        this.taskMapper = taskMapper;
        this.taskRepository = taskRepository;
        this.issueService = issueService;
        this.userRepository = userRepository;
        this.issueMapper=issueMapper;
        this.issueRepository=issueRepository;
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
            taskToUpdate.setType(taskWriteModel.getType());
            taskToUpdate = taskRepository.save(taskToUpdate);
        }
        return taskMapper.toReadModel(taskToUpdate);
    }

    public TaskReadModel setTaskStatusClosed(Long taskId,String result){
        Optional<Task> task = taskRepository.findTaskByTaskId(taskId);
        Task taskToUpdate = new Task();
        if(task.isPresent()){
            taskToUpdate = task.get();
            taskToUpdate.setStatus(Status.CLOSED);

            if (result == null || result.isEmpty()) {
                taskToUpdate.setResult("Not given");
            } else {
                System.out.println(result);
                taskToUpdate.setResult(result);
            }
            taskToUpdate.setFinalizationDate(LocalDateTime.now());
            taskToUpdate = taskRepository.save(taskToUpdate);
        }
        return taskMapper.toReadModel(taskToUpdate);
    }

    public TaskReadModel setTaskStatusOpen(Long taskId){
        Optional<Task> task = taskRepository.findTaskByTaskId(taskId);
        Task taskToUpdate = new Task();
        if(task.isPresent()){
            taskToUpdate = task.get();
            taskToUpdate.setStatus(Status.OPEN);
            taskToUpdate.setOpenDate(LocalDateTime.now());
            taskToUpdate = taskRepository.save(taskToUpdate);
        }
        return taskMapper.toReadModel(taskToUpdate);
    }

    public TaskReadModel setTaskStatusInProgress(Long taskId,String userLogin){
        Optional<Task> task = taskRepository.findTaskByTaskId(taskId);
        Task taskToUpdate = new Task();
        if(task.isPresent()){
            taskToUpdate = task.get();
            taskToUpdate.setStatus(Status.IN_PROGRESS);
            taskToUpdate.setResponsiblePerson(userRepository.findUserByLogin(userLogin).get());
            taskToUpdate.setInProgressDate(LocalDateTime.now());
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

    public IssueReadModel getParentIssue(Long taskId){
        Issue issue = taskRepository.findTaskByTaskId(taskId).get().getIssue();
        return issueMapper.toReadModel(issue);
    }

    public List<TaskReadModel>getTasksForUser(Long userId){
        List<Task> tasks = taskRepository.findTasksForUser(userId);
        return taskMapper.map(tasks);
    }

}
