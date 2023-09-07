package pl.polsl.tab.goji.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.tab.goji.model.dto.read.UserReadModel;
import pl.polsl.tab.goji.model.dto.write.UserWriteModel;
import pl.polsl.tab.goji.model.entity.User;
import pl.polsl.tab.goji.service.UserService;
import pl.polsl.tab.goji.utility.EmailValidator;

import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserReadModel>> getAllUsers(){
        List<UserReadModel> listOfUsers = userService.getAllUsers();
        return ResponseEntity.ok(listOfUsers);
    }

    @PostMapping
    public ResponseEntity<?> addUser(@RequestBody UserWriteModel userWriteModel) {
        int errorId=0;
        if(!EmailValidator.checkEmail(userWriteModel.getEmail())){
            errorId+=1;
        }
        if(userService.checkIfUserExist(userWriteModel)){
            errorId+=2;
        }
        if(errorId>0){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorId);
        }
        UserReadModel user = userService.addUser(userWriteModel);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserReadModel> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(userService.findUserByUserId(id));
    }

    @GetMapping("/login/{login}")
    public ResponseEntity<?> getUserByLogin(@PathVariable String login){
        UserReadModel user = userService.findUserByLogin(login);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/duringLogin/{login}")
    public ResponseEntity<?> getUserByLoginDuringLoginIn(@PathVariable String login){
        UserReadModel user = userService.findUserByLogin(login);
        if(user!=null && user.isActive()){
            return ResponseEntity.ok(user);
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No such user or not active");
        }

    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserReadModel> updateUser(@PathVariable Long userId, @RequestBody UserWriteModel userWriteModel) {
        UserReadModel updatedUser = userService.updateUser(userId, userWriteModel);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/{userId}/subElements")
    public ResponseEntity<?> getSubElementsForUser(@PathVariable Long userId){
        UserReadModel user = userService.findUserByUserId(userId);
        if(Objects.equals(user.getRole(), "Worker")){
            return ResponseEntity.ok(userService.getTasksForUser(userId));
        }
        else if(Objects.equals(user.getRole(), "Account Manager")){
            return ResponseEntity.ok(userService.getRequestsForUser(userId));
        }
        else if(Objects.equals(user.getRole(), "Product Manager")){
            return ResponseEntity.ok(userService.getIssuesForUser(userId));
        }
        else if(Objects.equals(user.getRole(), "Admin")){
            return ResponseEntity.status(HttpStatus.OK).body("");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User wrong role");
    }

    @PutMapping("/{userId}/notActive")
    public ResponseEntity<UserReadModel>setUserNotActive(@PathVariable Long userId){
        return ResponseEntity.ok(userService.setUserNotActive(userId));
    }

    @PutMapping("/{userId}/active")
    public ResponseEntity<UserReadModel>setUserActive(@PathVariable Long userId){
        return ResponseEntity.ok(userService.setUserActive(userId));
    }

}
