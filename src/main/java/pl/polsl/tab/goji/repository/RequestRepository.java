package pl.polsl.tab.goji.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.polsl.tab.goji.model.entity.Request;

import java.util.Optional;


public interface RequestRepository extends JpaRepository<Request, Long>{

    Optional<Request> findRequestByRequestId(Long requestId);

    Optional<Request> findIssueByRequestName(String requestId);
}