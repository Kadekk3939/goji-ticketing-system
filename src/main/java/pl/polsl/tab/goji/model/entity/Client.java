package pl.polsl.tab.goji.model.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "client")
@Data
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "client_id")
    private Long clientId;

    @NotBlank(message = "Name must not be blank")
    @Column(name = "Name")
    private String name;

    @NotBlank(message = "Email must not be blank")
    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @OneToMany
    private Set<Product> products = new HashSet<>();
}
