package pl.polsl.tab.goji.model.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "issue")
@Data
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "issue_id")
    private Long issueId;

    @NotBlank(message = "Issue name must not be blank")
    @Column(name = "issue_name")
    private String issueName;

    @Column(name = "description")
    private String description;

    @Column(name = "result")
    private String result;

    @Column(name = "status")
    private String status;

    @Column(name = "type")
    private String type;

    @GeneratedValue()
    @Column(name = "open_date")
    private LocalDateTime openDate;

    @Column(name = "in_progress_date")
    private LocalDateTime inProgressDate;

    @Column(name = "finalization_date")
    private LocalDateTime finalizationDate;
/*
    @ManyToOne
    @JoinColumn(name = "userId")
    @Column(name = "responsible_manager")
    private User responsibleManager;
*/
    @PrePersist
    public void prePersist() {
        openDate = LocalDateTime.now();
    }

}
