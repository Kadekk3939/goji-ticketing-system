package pl.polsl.tab.goji.model.dto.write;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IssueWriteModel {
    @NotBlank(message = "Request Id must not be blank")
    private Long requestId;
    private String responsibleUser;
    @NotBlank(message = "Issue name must not be blank")
    private String issueName;
    private String description;
    private String type;
}
