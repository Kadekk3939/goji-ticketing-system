package pl.polsl.tab.goji.model.entity;

import lombok.*;
import org.hibernate.Hibernate;
import pl.polsl.tab.goji.model.enums.Status;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "request")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "request_id")
    private Long requestId;

    @Column(name = "request_name")
    private String requestName;

    @Column(name = "description")
    private String description;

    @Column(name = "result")
    private String result;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status;

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
    @NotNull(message = "Product id must not be null")
    @JoinColumn(name = "productId")
    private Product product;

    @OneToMany
    @ToString.Exclude
    private Set<Issue> issues = new HashSet<>();

    @PrePersist
    public void prePersist() {
        openDate = LocalDateTime.now();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Request request = (Request) o;
        return requestId != null && Objects.equals(requestId, request.requestId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
