package pl.polsl.tab.goji.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.polsl.tab.goji.model.entity.Product;
import pl.polsl.tab.goji.model.entity.Request;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findProductByProductId(Long productId);

    Optional<Product> findProductByProductName(String productName);

    @Query(value = "SELECT * FROM product where client_id = ?1 ORDER BY product_id ASC",nativeQuery = true)
    List<Product> findAllProductsFromClient(Long clientId);
}
