package pl.polsl.tab.goji.model.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "request")
@Data
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "request_id")
    private Long requestId;

    @NotBlank(message = "Request name must not be blank")
    @Column(name = "request_name")
    private String requestName;

    @Column(name = "description")
    private String description;

    @Column(name = "result")
    private String result;

    @Column(name = "status")
    private String status;

    @GeneratedValue()
    @Column(name = "open_date")
    private LocalDateTime openDate;

    @Column(name = "in_progress_date")
    private LocalDateTime inProgressDate;

    @Column(name = "finalization_date")
    private LocalDateTime finalizationDate;

    @ManyToOne
    @JoinColumn(name = "userId")
    @Column(name = "response_manager")
    private User responseManager;

    @PrePersist
    public void prePersist() {
        openDate = LocalDateTime.now();
    }

}
