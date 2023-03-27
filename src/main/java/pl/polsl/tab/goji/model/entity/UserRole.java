package pl.polsl.tab.goji.model.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user_roles")
@Data
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "role_id")
    private Long roleId;

    @NotBlank(message = "Role must not be blank")
    @Column(name = "role", unique = true)
    private String roleName;
}