package pl.polsl.tab.goji.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.polsl.tab.goji.model.entity.Issue;
import pl.polsl.tab.goji.model.entity.Request;

import java.util.List;
import java.util.Optional;


public interface RequestRepository extends JpaRepository<Request, Long>{

    Optional<Request> findRequestByRequestId(Long requestId);

    Optional<Request> findRequestByRequestName(String requestId);

    @Query(value = "SELECT * FROM request where product_id = ?1 ORDER BY request_id ASC",nativeQuery = true)
    List<Request> findAllRequestsFromProduct(Long productId);
}