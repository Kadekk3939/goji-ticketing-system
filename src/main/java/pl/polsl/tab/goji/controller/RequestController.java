package pl.polsl.tab.goji.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.tab.goji.model.dto.read.RequestReadModel;
import pl.polsl.tab.goji.model.dto.read.UserReadModel;
import pl.polsl.tab.goji.model.dto.write.RequestWriteModel;
import pl.polsl.tab.goji.model.dto.write.UserWriteModel;
import pl.polsl.tab.goji.model.entity.Request;
import pl.polsl.tab.goji.service.RequestService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/request")
public class RequestController {

    private final RequestService requestService;

    public RequestController(RequestService requestService){this.requestService=requestService;}

    @PostMapping
    public ResponseEntity<RequestReadModel> addRequest(@RequestBody RequestWriteModel requestWriteModel){
        return new ResponseEntity<>(requestService.addRequest(requestWriteModel), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<RequestReadModel>> getAllRequests(){
        return new ResponseEntity<>(requestService.getAllRequests(),HttpStatus.OK);
    }

    @PutMapping("/{requestId}")
    public ResponseEntity<RequestReadModel> updateRequest(@PathVariable Long requestId, @RequestBody RequestWriteModel requestWriteModel) {
        RequestReadModel updateRequest = requestService.updateRequest(requestId, requestWriteModel);
        return ResponseEntity.ok(updateRequest);
    }

    @GetMapping("/{requestId}")
    public ResponseEntity<RequestReadModel> getRequestById(@PathVariable Long requestId) {
        RequestReadModel request = requestService.getRequestReadModelById(requestId);
        return ResponseEntity.ok(request);
    }
}
