package pl.polsl.tab.goji.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.tab.goji.model.dto.read.UserReadModel;
import pl.polsl.tab.goji.model.dto.write.UserWriteModel;
import pl.polsl.tab.goji.model.entity.User;
import pl.polsl.tab.goji.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/user") //TODO: 's
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> listOfUsers = userService.getAllUsers();
        return new ResponseEntity<>(listOfUsers, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<UserReadModel> addUser(@RequestBody UserWriteModel userWriteModel) {
        return new ResponseEntity<>(userService.addUser(userWriteModel), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserReadModel> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(userService.findUserByUserId(id));
    }
}
