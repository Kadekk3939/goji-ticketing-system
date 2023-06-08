package pl.polsl.tab.goji.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.tab.goji.mappers.TaskMapper;
import pl.polsl.tab.goji.model.dto.read.TaskReadModel;
import pl.polsl.tab.goji.model.dto.write.TaskWriteModel;
import pl.polsl.tab.goji.model.entity.Task;
import pl.polsl.tab.goji.model.entity.User;
import pl.polsl.tab.goji.repository.TaskRepository;

import java.util.List;

@Service
public class TaskService {

    private final TaskMapper taskMapper;
    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskMapper taskMapper,TaskRepository taskRepository){
        this.taskMapper = taskMapper;
        this.taskRepository = taskRepository;
    }

    public TaskReadModel addTask(TaskWriteModel taskWriteModel){
        Task task = taskMapper.toEntity(taskWriteModel);

        return taskRepository.existsById(task.getTaskId())
                ? null : taskMapper.toReadModel(taskRepository.save(task));
    }

    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

}
