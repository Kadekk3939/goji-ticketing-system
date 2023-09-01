package pl.polsl.tab.goji.model.dto.read;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserReadModel {

    private Long userId;
    private String firstName;
    private String lastName;
    private String login;
    private String email;
    private String role;
}
