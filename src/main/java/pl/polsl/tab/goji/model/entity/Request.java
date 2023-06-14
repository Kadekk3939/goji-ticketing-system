package pl.polsl.tab.goji.model.entity;

import lombok.Data;
import pl.polsl.tab.goji.model.enums.RequestStatus;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

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
    @Enumerated(EnumType.STRING)
    private RequestStatus status;

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
    @NotNull(message = "Product must not be null")
    @JoinColumn(name = "productId")
    private Product product;

    @OneToMany
    private Set<Issue> issues = new HashSet<>();

    @PrePersist
    public void prePersist() {
        openDate = LocalDateTime.now();
    }

}
