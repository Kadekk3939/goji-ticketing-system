package pl.polsl.tab.goji.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.tab.goji.model.dto.read.ClientReadModel;
import pl.polsl.tab.goji.model.dto.read.UserReadModel;
import pl.polsl.tab.goji.model.dto.write.ClientWriteModel;
import pl.polsl.tab.goji.model.dto.write.UserWriteModel;
import pl.polsl.tab.goji.model.entity.Client;
import pl.polsl.tab.goji.service.ClientService;

import java.util.List;

@RestController
@RequestMapping("/client")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService){this.clientService = clientService;}

    @GetMapping("/all")
    public ResponseEntity<List<ClientReadModel>> getAllClients(){
        List<ClientReadModel> listOfClients = clientService.getAllClients();
        return new ResponseEntity<>(listOfClients, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ClientReadModel> addClient(@RequestBody ClientWriteModel clientWriteModel) {
        return new ResponseEntity<>(clientService.addClient(clientWriteModel), HttpStatus.OK);
    }
}
