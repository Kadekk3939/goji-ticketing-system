package pl.polsl.tab.goji.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.tab.goji.model.entity.UserRole;
import pl.polsl.tab.goji.repository.UserRoleRepository;

import java.util.Optional;

@Service
public class UserRoleService {
    private final UserRoleRepository userRoleRepository;

    @Autowired
    public UserRoleService(UserRoleRepository userRoleRepository) {
        this.userRoleRepository = userRoleRepository;
    }

    public Long getUserRoleIdByRoleName(String roleName) {
        Optional<UserRole> role = userRoleRepository.findUserRoleByRoleName(roleName);
        return role.map(UserRole::getRoleId).orElse(null);
    }
}