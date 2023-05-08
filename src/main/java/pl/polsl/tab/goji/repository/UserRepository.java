package pl.polsl.tab.goji.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.polsl.tab.goji.model.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByUserId(Long userId);

    Optional<User> findUserByLogin(String login);

    Optional<User> findUserByEmail(String email);

    Boolean existsUserByLoginOrEmail(String login, String Email);

    List<User> findAll();
}
