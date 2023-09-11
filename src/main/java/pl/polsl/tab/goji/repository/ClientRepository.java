package pl.polsl.tab.goji.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.polsl.tab.goji.model.entity.Client;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Long>{

    Optional<Client> findClientByClientId(Long clientId);

    Optional<Client> findClientByName(String name);

    Boolean existsClientByNameOrEmailOrPhoneNumber(String name, String email, String phoneNumber);

    void deleteAll();
}
