package pl.polsl.tab.goji.model.entity;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "user_roles")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "role_id")
    private Long roleId;

    //Admin
    //Account Manager
    //Product Manager
    //Worker
    @NotBlank(message = "Role must not be blank")
    @Column(name = "role", unique = true)
    private String roleName;

    @OneToMany
    @ToString.Exclude
    private Set<User> users = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserRole userRole = (UserRole) o;
        return roleId != null && Objects.equals(roleId, userRole.roleId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}