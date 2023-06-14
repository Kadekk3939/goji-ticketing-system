package pl.polsl.tab.goji.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import pl.polsl.tab.goji.model.dto.read.IssueReadModel;
import pl.polsl.tab.goji.model.dto.write.IssueWriteModel;
import pl.polsl.tab.goji.model.entity.Issue;

import java.util.List;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy. WARN)
		
public interface IssueMapper {
	
    IssueMapper INSTANCE = Mappers.getMapper(IssueMapper.class);

    Issue toEntity(IssueWriteModel issueWriteModel);

    IssueReadModel toReadModel(Issue issue);

    List<IssueReadModel> map(List<Issue> issues);
}