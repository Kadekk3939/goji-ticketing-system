package pl.polsl.tab.goji.model.dto.read;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductReadModel {

    private Long productId;
    private Long clientId;
    private String productName;
    private String version;
    private String description;
}
