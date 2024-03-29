package pl.polsl.tab.goji.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import pl.polsl.tab.goji.model.dto.read.*;
import pl.polsl.tab.goji.model.dto.write.ClientWriteModel;
import pl.polsl.tab.goji.model.dto.write.ProductWriteModel;
import pl.polsl.tab.goji.model.dto.write.TaskWriteModel;
import pl.polsl.tab.goji.service.ProductService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService){this.productService = productService;}

    @PostMapping
    public ResponseEntity<ProductReadModel> addProduct(@RequestBody ProductWriteModel productWriteModel){
        return new ResponseEntity<>(productService.addProduct(productWriteModel), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ProductReadModel>> getAllProducts(){
        return new ResponseEntity<>(productService.getAllProducts(),HttpStatus.OK);
    }

    @GetMapping("/{productId}/requests")
    public ResponseEntity<List<RequestReadModel>> getSubRequests(@PathVariable Long productId){
        return ResponseEntity.ok(productService.getSubRequests(productId));
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductReadModel> getProduct(@PathVariable Long productId){
        return  ResponseEntity.ok(productService.getProductDto(productId));
    }

    @GetMapping("/{productId}/client")
    public ResponseEntity<ClientReadModel> getParentClient(@PathVariable Long productId){
        return ResponseEntity.ok(productService.getParentClient(productId));
    }

    @PutMapping("/{productId}")
    public ResponseEntity<ProductReadModel> updateProduct(@PathVariable Long productId, @RequestBody ProductWriteModel productWriteModel) {
        ProductReadModel updatedProduct = productService.productUpdate(productId, productWriteModel);
        return ResponseEntity.ok(updatedProduct);
    }
}
