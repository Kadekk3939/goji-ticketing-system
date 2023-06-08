package pl.polsl.tab.goji.mappers;


import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import pl.polsl.tab.goji.model.dto.read.ClientReadModel;
import pl.polsl.tab.goji.model.dto.write.ClientWriteModel;
import pl.polsl.tab.goji.model.entity.Client;

import java.util.List;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.WARN)
public interface ClientMapper {
    ClientMapper INSTANCE = Mappers.getMapper(ClientMapper.class);

    Client toEntinty(ClientWriteModel clientWriteModel);

    ClientReadModel toReadModel(Client client);

    List<ClientReadModel> map (List<Client>clients);
}
