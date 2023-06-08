package pl.polsl.tab.goji.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
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

    TaskReadModel toReadModel(Task task);

    List<TaskReadModel> map(List<Task> donations);
}
