package pl.polsl.tab.goji.model.entity;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "client")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
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
    @ToString.Exclude
    private Set<Product> products = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Client client = (Client) o;
        return clientId != null && Objects.equals(clientId, client.clientId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
