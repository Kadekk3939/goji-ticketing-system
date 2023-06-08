package pl.polsl.tab.goji.mappers;


import org.mapstruct.Mapper;
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

    Product toEntity(ProductWriteModel productWriteModel);

    List<ProductReadModel> map(List<Product> products);
}
