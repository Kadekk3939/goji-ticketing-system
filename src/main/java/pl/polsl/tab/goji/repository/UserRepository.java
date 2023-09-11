package pl.polsl.tab.goji.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.polsl.tab.goji.model.entity.Task;
import pl.polsl.tab.goji.model.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByUserId(Long userId);

    Optional<User> findUserByLogin(String login);

    Optional<User> findUserByEmail(String email);

    Boolean existsUserByLoginOrEmail(String login, String Email);

    @Query(value = "SELECT * FROM users INNER JOIN user_roles ON users.role_id = user_roles.role_id WHERE user_roles.role = ?1", nativeQuery = true)
    List<User> getAllUsersWithRole(String userRole);
}
