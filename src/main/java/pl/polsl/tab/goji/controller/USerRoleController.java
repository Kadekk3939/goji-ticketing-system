package pl.polsl.tab.goji.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.tab.goji.model.entity.UserRole;
import pl.polsl.tab.goji.service.UserRoleService;

import java.util.List;

@RestController
@RequestMapping("/userRole")
public class USerRoleController {

    public final UserRoleService userRoleService;

    public USerRoleController(UserRoleService userRoleService){
        this.userRoleService = userRoleService;
    }

    @PostMapping
    public ResponseEntity<String> addUserRole(UserRole userRole){
        return new ResponseEntity<>(userRoleService.addUserRole(userRole), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<UserRole>> getAllUserRoles(){
        List<UserRole> userRoles = userRoleService.getAllUserRoles();
        return new ResponseEntity<>(userRoles, HttpStatus.OK);
    }
}
