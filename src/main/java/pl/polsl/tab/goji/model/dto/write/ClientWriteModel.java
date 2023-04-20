package pl.polsl.tab.goji.model.dto.write;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientWriteModel {
    @NotBlank(message = "Name must not be blank")
    private String name;
    @NotBlank(message = "Email must not be blank")
    private String email;
    private String phoneNumber;
}
