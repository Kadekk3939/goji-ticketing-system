package pl.polsl.tab.goji.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.polsl.tab.goji.mappers.UserMapper;
import pl.polsl.tab.goji.model.dto.read.UserReadModel;
import pl.polsl.tab.goji.model.dto.write.UserWriteModel;
import pl.polsl.tab.goji.model.entity.Task;
import pl.polsl.tab.goji.model.entity.User;
import pl.polsl.tab.goji.model.entity.UserRole;
import pl.polsl.tab.goji.repository.UserRepository;
import pl.polsl.tab.goji.repository.UserRoleRepository;
import pl.polsl.tab.goji.utility.CurrentUserData;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder encoder;
    private final UserMapper userMapper;

    @Autowired
    public UserService(UserRepository userRepository, UserRoleRepository userRoleRepository, PasswordEncoder encoder, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
        this.encoder = encoder;
        this.userMapper = userMapper;
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

    public User updateUser(User user){
        return userRepository.save(user);
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
        return user.<UserReadModel>map(userMapper::toReadModel).orElse(null);
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
}
