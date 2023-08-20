package pl.polsl.tab.goji.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import pl.polsl.tab.goji.model.dto.read.RequestReadModel;
import pl.polsl.tab.goji.model.dto.write.RequestWriteModel;
import pl.polsl.tab.goji.model.entity.Request;

import java.util.List;

@Mapper(componentModel =  "spring",
    unmappedTargetPolicy = ReportingPolicy.WARN)
public interface RequestMapper {

    RequestMapper INSTANCE = Mappers.getMapper(RequestMapper.class);

    Request toEntity(RequestWriteModel requestWriteModel);

    @Mapping(source = "product.productId" ,target = "productId")
    RequestReadModel toReadModel(Request request);
    List<RequestReadModel> map(List<Request> products);

}
