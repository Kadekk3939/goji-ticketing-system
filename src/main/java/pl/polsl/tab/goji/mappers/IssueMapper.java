package pl.polsl.tab.goji.mappers;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;
import pl.polsl.tab.goji.model.dto.read.IssueReadModel;
import pl.polsl.tab.goji.model.dto.write.IssueWriteModel;
import pl.polsl.tab.goji.model.entity.Issue;

import java.util.List;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.WARN)
public interface IssueMapper {
    IssueMapper INSTANCE = Mappers.getMapper(IssueMapper.class);

    @Mapping(target = "issueId",ignore = true)
    Issue toEntity(IssueWriteModel issueWriteModel);

    @Mappings({
            @Mapping(source = "request.requestId" ,target = "requestId"),
            @Mapping(source="responsiblePerson.login",target="responsibleUser")
    })
    IssueReadModel toReadModel(Issue issue);

    List<IssueReadModel>map(List<Issue> issues);
}
