package pl.polsl.tab.goji.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import pl.polsl.tab.goji.model.dto.read.TaskReadModel;
import pl.polsl.tab.goji.model.dto.read.UserReadModel;
import pl.polsl.tab.goji.model.dto.write.TaskWriteModel;
import pl.polsl.tab.goji.model.dto.write.UserWriteModel;
import pl.polsl.tab.goji.model.entity.Task;
import pl.polsl.tab.goji.model.entity.User;
import pl.polsl.tab.goji.service.TaskService;
import pl.polsl.tab.goji.service.UserService;

@RestController
@RequestMapping("/task")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Task>> getAllTasks(){
        List<Task> listOfTasks = taskService.getAllTasks();
        return new ResponseEntity<>(listOfTasks, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TaskReadModel> addTask(@RequestBody TaskWriteModel taskWriteModel) {
        return new ResponseEntity<>(taskService.addTask(taskWriteModel), HttpStatus.OK);
    }
}
