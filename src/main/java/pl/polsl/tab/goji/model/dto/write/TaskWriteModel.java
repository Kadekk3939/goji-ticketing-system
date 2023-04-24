package pl.polsl.tab.goji.model.dto.write;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskWriteModel {
    @NotBlank(message = "Task name must not be blank")
    private String requestName;
    private String description;
    private String type;
}
