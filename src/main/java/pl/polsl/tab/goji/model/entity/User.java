package pl.polsl.tab.goji.model.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private Long userId;

    @NotBlank(message = "Login must not be blank")
    @Column(name = "login", unique = true)
    private String login;

    @NotBlank(message = "Password must not be blank")
    @Column(name = "password")
    private String password;
}
