package pl.polsl.tab.goji.model.dto.read;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestReadModel {

    private Long requestId;
    private Long productId;
    private String responsibleUser;
    private String requestName;
    private String description;
    private String result;
    private String status;
    private String type;
    private LocalDateTime openDate;
    private LocalDateTime inProgressDate;
    private LocalDateTime finalizationDate;
}
