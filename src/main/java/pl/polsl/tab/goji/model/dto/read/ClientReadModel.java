package pl.polsl.tab.goji.model.dto.read;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientReadModel {

    private Long clientId;
    private String name;
    private String email;
    private String phoneNumber;
}
