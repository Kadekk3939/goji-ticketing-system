package pl.polsl.tab.goji.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.polsl.tab.goji.mappers.UserMapper;
import pl.polsl.tab.goji.model.dto.read.IssueReadModel;
import pl.polsl.tab.goji.model.dto.read.RequestReadModel;
import pl.polsl.tab.goji.model.dto.read.TaskReadModel;
import pl.polsl.tab.goji.model.dto.read.UserReadModel;
import pl.polsl.tab.goji.model.dto.write.UserWriteModel;
import pl.polsl.tab.goji.model.entity.Issue;
import pl.polsl.tab.goji.model.entity.Task;
import pl.polsl.tab.goji.model.entity.User;
import pl.polsl.tab.goji.model.entity.UserRole;
import pl.polsl.tab.goji.repository.*;
import pl.polsl.tab.goji.utility.CurrentUserData;
import pl.polsl.tab.goji.model.entity.Request;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder encoder;
    private final UserMapper userMapper;
    private final IssueService issueService;
    private final TaskService taskService;
    private final RequestService requestService;

    @Autowired
    public UserService(UserRepository userRepository, UserRoleRepository userRoleRepository, PasswordEncoder encoder, UserMapper userMapper,
                       IssueService issueService,TaskService taskService,RequestService requestService) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
        this.encoder = encoder;
        this.userMapper = userMapper;
        this.taskService = taskService;
        this.issueService = issueService;
        this.requestService = requestService;
    }

    public UserReadModel addUser(UserWriteModel userWriteModel) {
        User user = userMapper.toEntity(userWriteModel);
        user.setPassword(encoder.encode(userWriteModel.getPassword()));
        Optional<UserRole> role = userRoleRepository.findUserRoleByRoleName(userWriteModel.getRole());
        role.ifPresent(user::setUserRole);
        UserRole userRole;
        if(role.isPresent()){
            userRole = role.get();
            Set<User> users = userRole.getUsers();
            users.add(user);
            userRole.setUsers(users);
        }

        return userRepository.existsUserByLoginOrEmail(user.getLogin(), user.getEmail())
                ? null : userMapper.toReadModel(userRepository.save(user));
    }

    public List<UserReadModel> getAllUsers(){
        return userMapper.map(userRepository.findAll());
    }

    public UserReadModel updateUser(Long userId,UserWriteModel userWriteModel){
        Optional<User> user = userRepository.findById(userId);
        User userToUpdate;
        User updatedUser = new User();
        if(user.isPresent()){
            userToUpdate = user.get();
            userToUpdate.setUserRole(userRoleRepository.findUserRoleEntityByRoleName(userWriteModel.getRole()));
            userToUpdate.setLogin(userWriteModel.getLogin());
            userToUpdate.setFirstName(userWriteModel.getFirstName());
            userToUpdate.setLastName(userWriteModel.getLastName());
            userToUpdate.setEmail(userWriteModel.getEmail());
            updatedUser = userRepository.save(userToUpdate);
        }
        return userMapper.toReadModel(updatedUser);
    }

    public void deleteUserByUserId(Long userId){
        userRepository.deleteById(userId);
    }

    public UserReadModel findUserByUserId(Long userId){
        Optional<User> user = userRepository.findUserByUserId(userId);
        return user.<UserReadModel>map(userMapper::toReadModel).orElse(null);
    }

    public UserReadModel findUserByLogin(String login){
        Optional<User> user = userRepository.findUserByLogin(login);
        if(user.isPresent()){
            return user.<UserReadModel>map(userMapper::toReadModel).orElse(null);
        }
        else{
            return null;
        }

    }

    public User findUserByEmail(String email){
        Optional<User> user = userRepository.findUserByEmail(email);
        return user.orElse(null);
    }

    public User getUserEntityByLogin(String login) {
        Optional<User> user = userRepository.findUserByLogin(login);
        return user.orElse(null);
    }

    public User getLoggedUserEntity() {
        String login = CurrentUserData.getCurrentUserLogin();
        if (login != null) {
            return this.getUserEntityByLogin(login);
        }
        return null;
    }

    public String generatePrefix(Long userId) {
        return String.format("%04x", userId);
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findUserByLogin(username);

        if (user.isEmpty()) {
            throw new UsernameNotFoundException(username);
        }

        return user.get();
    }

    public boolean checkIfUserExist(UserWriteModel userWriteModel){
        return userRepository.findUserByLogin(userWriteModel.getLogin()).isPresent();
    }

    public List<IssueReadModel> getIssuesForUser(Long userId){
        return issueService.getIssuesForUser(userId);
    }

    public List<RequestReadModel> getRequestsForUser(Long userId){
        return requestService.getRequestsForUser(userId);
    }

    public List<TaskReadModel> getTasksForUser(Long userId){
        return  taskService.getTasksForUser(userId);
    }

    public UserReadModel setUserNotActive(Long userId){
        User user = userRepository.findUserByUserId(userId).get();
        user.setActive(false);
        user = userRepository.save(user);
        if(Objects.equals(user.getUserRole().getRoleName(), "Account Manager")){
            requestService.responsibleUserDisactivate(userId);
        }
        else if(Objects.equals(user.getUserRole().getRoleName(), "Product Manage")){
            issueService.responsibleUserDisactivate(userId);
        }
        if(Objects.equals(user.getUserRole().getRoleName(), "Worker")){
            taskService.responsibleUserDisactivate(userId);
        }
        return userMapper.toReadModel(user);
    }

    public UserReadModel setUserActive(Long userId){
        User user = userRepository.findUserByUserId(userId).get();
        user.setActive(true);
        user = userRepository.save(user);
        return userMapper.toReadModel(user);
    }

    public List<UserReadModel> getAllUserWithRole(String role){
        return userMapper.map(userRepository.getAllUsersWithRole(role));
    }
}
