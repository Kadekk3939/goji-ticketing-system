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
@CrossOrigin(origins = "http://localhost:4200")
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
    public ResponseEntity<UserReadModel> addUser(@RequestBody UserWriteModel userWriteModel) {
        return new ResponseEntity<>(userService.addUser(userWriteModel), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserReadModel> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(userService.findUserByUserId(id));
    }

    @GetMapping("/login/{login}")
    public ResponseEntity<UserReadModel> getUserByLogin(@PathVariable String login){
        return ResponseEntity.ok(userService.findUserByLogin(login));
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserReadModel> updateUser(@PathVariable Long userId, @RequestBody UserWriteModel userWriteModel) {
        UserReadModel updatedUser = userService.updateUser(userId, userWriteModel);
        return ResponseEntity.ok(updatedUser);
    }

}
