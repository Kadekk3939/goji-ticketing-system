package pl.polsl.tab.goji.mappers;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import pl.polsl.tab.goji.model.dto.read.ProductReadModel;
import pl.polsl.tab.goji.model.dto.write.ProductWriteModel;
import pl.polsl.tab.goji.model.entity.Product;

import java.util.List;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.WARN)
public interface ProductMapper {
    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    @Mapping(target = "productId", ignore = true) // Ignore ID during mapping
    Product toEntity(ProductWriteModel productWriteModel);

    @Mapping(source = "client.clientId" ,target = "clientId")
    ProductReadModel toReadModel(Product product);
    List<ProductReadModel> map(List<Product> products);
}
