package pl.polsl.tab.goji.mappers;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import pl.polsl.tab.goji.model.dto.read.TaskReadModel;
import pl.polsl.tab.goji.model.dto.write.TaskWriteModel;
import pl.polsl.tab.goji.model.entity.Task;

import java.util.List;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy. WARN)
public interface TaskMapper {
    TaskMapper INSTANCE = Mappers.getMapper(TaskMapper.class);

    Task toEntity(TaskWriteModel taskWriteModel);

    @Mappings({@Mapping(source = "issue.issueId" ,target = "issueId"),
            @Mapping(source="responsiblePerson.userId",target="responsibleUser")})
    TaskReadModel toReadModel(Task task);

    List<TaskReadModel> map(List<Task> donations);
}
