package pl.polsl.tab.goji.model.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

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

    @ManyToOne
    @JoinColumn(name = "userId")
    private User responsiblePerson;

    @ManyToOne
    @NotNull(message = "Request must not be null")
    @JoinColumn(name = "requestId")
    private Request request;

    @OneToMany
    private Set<Task> tasks = new HashSet<>();

    @PrePersist
    public void prePersist() {
        openDate = LocalDateTime.now();
    }

}
