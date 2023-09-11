package pl.polsl.tab.goji.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import pl.polsl.tab.goji.model.dto.read.IssueReadModel;
import pl.polsl.tab.goji.model.dto.read.RequestReadModel;
import pl.polsl.tab.goji.model.dto.read.TaskReadModel;
import pl.polsl.tab.goji.model.dto.read.UserReadModel;
import pl.polsl.tab.goji.model.dto.write.IssueWriteModel;
import pl.polsl.tab.goji.model.dto.write.TaskWriteModel;
import pl.polsl.tab.goji.model.dto.write.UserWriteModel;
import pl.polsl.tab.goji.model.entity.Task;
import pl.polsl.tab.goji.model.entity.User;
import pl.polsl.tab.goji.service.TaskService;
import pl.polsl.tab.goji.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/task")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<TaskReadModel>> getAllTasks(){
        return new ResponseEntity<>(taskService.getAllTasks(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TaskReadModel> addTask(@RequestBody TaskWriteModel taskWriteModel) {
        return new ResponseEntity<>(taskService.addTask(taskWriteModel), HttpStatus.OK);
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<TaskReadModel> updateTask(@PathVariable Long taskId, @RequestBody TaskWriteModel taskWriteModel) {
        TaskReadModel updatedTask = taskService.taskUpdate(taskId, taskWriteModel);
        return ResponseEntity.ok(updatedTask);
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<TaskReadModel> getTaskById(@PathVariable Long taskId) {
        TaskReadModel taskReadModel = taskService.getTaskReadModelById(taskId);
        return ResponseEntity.ok(taskReadModel);
    }

    @PutMapping("/{taskId}/close")
    public ResponseEntity<TaskReadModel> setTaskStatusClosed(@PathVariable Long taskId,@RequestBody String result) {
        TaskReadModel taskReadModel = taskService.setTaskStatusClosed(taskId,result);
        return ResponseEntity.ok(taskReadModel);
    }

    @PutMapping("/{taskId}/open")
    public ResponseEntity<TaskReadModel> setTaskStatusOpen(@PathVariable Long taskId) {
        TaskReadModel taskReadModel = taskService.setTaskStatusOpen(taskId);
        return ResponseEntity.ok(taskReadModel);
    }

    @PutMapping("/{taskId}/inProgress")
    public ResponseEntity<TaskReadModel> setTaskStatusInProgress(@PathVariable Long taskId,@RequestBody String userLogin) {
        TaskReadModel taskReadModel = taskService.setTaskStatusInProgress(taskId,userLogin);
        return ResponseEntity.ok(taskReadModel);
    }

    @GetMapping("/{taskId}/issue")
    public ResponseEntity<IssueReadModel> getParentIssue(@PathVariable Long taskId){
        return ResponseEntity.ok(taskService.getParentIssue(taskId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TaskReadModel>> getTasksForUser(@PathVariable Long userId){
        return ResponseEntity.ok(taskService.getTasksForUser(userId));
    }

    @PutMapping("/{taskId}/cancel")
    public ResponseEntity<TaskReadModel> setTAskStatusCancel(@PathVariable Long taskId, @RequestBody String result) {
        TaskReadModel taskReadModel = taskService.setTaskStatusCancel(taskId,result);
        return ResponseEntity.ok(taskReadModel);
    }
}
