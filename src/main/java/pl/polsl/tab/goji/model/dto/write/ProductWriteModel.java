package pl.polsl.tab.goji.model.dto.write;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductWriteModel {
    @NotBlank(message = "Product name must not be blank")
    private String productName;
    private String version;
    private String description;
}
