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
        UserReadModel user = userService.addUser(userWriteModel);
        int erroId=0;
        if(!userService.checkEmail(userWriteModel.getEmail())){
            erroId+=1;
        }
        if(userService.checkIfUserExist(userWriteModel)){
            erroId+=2;
        }
        if(erroId>0){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(erroId);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserReadModel> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(userService.findUserByUserId(id));
    }

    @GetMapping("/login/{login}")
    public ResponseEntity<?> getUserByLogin(@PathVariable String login){
        UserReadModel user = userService.findUserByLogin(login);
        if(user!=null){
            return ResponseEntity.ok(user);
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No such user");
        }

    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserReadModel> updateUser(@PathVariable Long userId, @RequestBody UserWriteModel userWriteModel) {
        UserReadModel updatedUser = userService.updateUser(userId, userWriteModel);
        return ResponseEntity.ok(updatedUser);
    }

}
