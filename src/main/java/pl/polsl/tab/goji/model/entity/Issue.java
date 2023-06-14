package pl.polsl.tab.goji.model.entity;

import lombok.*;
import org.hibernate.Hibernate;
import pl.polsl.tab.goji.model.enums.Status;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "issue")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "issue_id")
    private Long issueId;

    @Column(name = "issue_name")
    private String issueName;

    @Column(name = "description")
    private String description;

    @Column(name = "result")
    private String result;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status;

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
    @ToString.Exclude
    private Set<Task> tasks = new HashSet<>();

    @PrePersist
    public void prePersist() {
        openDate = LocalDateTime.now();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Issue issue = (Issue) o;
        return issueId != null && Objects.equals(issueId, issue.issueId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
