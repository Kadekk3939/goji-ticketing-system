package pl.polsl.tab.goji.model.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

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

    @ManyToOne
    @NotNull(message = "Client must not be null")
    @JoinColumn(name = "clientId")
    private Client client;

    @OneToMany
    private Set<Request> requests = new HashSet<>();
}
