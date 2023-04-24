package pl.polsl.tab.goji.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.polsl.tab.goji.model.entity.Product;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findProductByProductId(Long productId);

    Optional<Product> findProductByProductName(String productName);
}
