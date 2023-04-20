package pl.polsl.tab.goji.model.dto.read;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientReadModel {
    String name;
    String email;
    String phoneNumber;
}
