package pl.polsl.tab.goji.model.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "product")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "product_id")
    private Long productId;

    @NotBlank(message = "Product name must not be blank")
    @Column(name = "product_name", unique = true)
    private String productName;

    @Column(name = "version")
    private String version;

    @Column(name = "description")
    private String description;
}
