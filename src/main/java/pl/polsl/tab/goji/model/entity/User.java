package pl.polsl.tab.goji.model.entity;

import  lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private Long userId;

    @NotBlank(message = "First name must not be blank")
    @Column(name = "first_name")
    private String firstName;

    @NotBlank(message = "Last name must not be blank")
    @Column(name = "last_name")
    private String lastName;

    @NotBlank(message = "Email must not be blank")
    @Column(name = "email", unique = true)
    private String email;

    @NotBlank(message = "Login must not be blank")
    @Column(name = "login", unique = true)
    private String login;

    @NotBlank(message = "Password must not be blank")
    @Column(name = "password")
    private String password;
    /*
    @ManyToOne
    @JoinColumn(name = "roleId")
    @NotNull(message = "Role must be provided")
    private UserRole userRole;
     */
}
