package pl.polsl.tab.goji.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.tab.goji.model.entity.UserRole;
import pl.polsl.tab.goji.service.UserRoleService;

import java.util.List;

@RestController
@RequestMapping("/userRole")
public class UserRoleController {

    public final UserRoleService userRoleService;

    public UserRoleController(UserRoleService userRoleService){
        this.userRoleService = userRoleService;
    }

    @PostMapping("/{name}")
    public ResponseEntity<String> addUserRole(@PathVariable String name){
        return new ResponseEntity<>(userRoleService.addUserRole(name), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<UserRole>> getAllUserRoles(){
        List<UserRole> userRoles = userRoleService.getAllUserRoles();
        return new ResponseEntity<>(userRoles, HttpStatus.OK);
    }
}
