package pl.polsl.tab.goji.model.dto.write;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestWriteModel {
    @NotBlank(message = "Request name must not be blank")
    private String requestName;
    @NotBlank(message = "Product Id must not be blank")
    private Long productId;
    private String responsibleUser;
    private String description;
    private String type;
}
