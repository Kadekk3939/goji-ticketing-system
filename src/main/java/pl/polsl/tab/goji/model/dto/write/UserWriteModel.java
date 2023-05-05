package pl.polsl.tab.goji.model.dto.write;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserWriteModel {
    @NotBlank(message = "First name must not be blank")
    private String firstName;
    @NotBlank(message = "Lsat name must not be blank")
    private String lastName;
    @NotBlank(message = "Login must not be blank")
    private String login;
    @NotBlank(message = "Password must not be blank")
    private String password;
    @NotBlank(message = "Email must not be blank")
    private String email;
    @NotBlank(message = "Role must not be blank")
    private String role;
}
