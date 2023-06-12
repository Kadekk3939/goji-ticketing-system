package pl.polsl.tab.goji.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.tab.goji.mappers.ClientMapper;
import pl.polsl.tab.goji.model.dto.read.ClientReadModel;
import pl.polsl.tab.goji.model.dto.write.ClientWriteModel;
import pl.polsl.tab.goji.model.entity.Client;
import pl.polsl.tab.goji.repository.ClientRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {
    private final ClientMapper clientMapper;
    private final ClientRepository clientRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository,ClientMapper clientMapper){
        this.clientMapper = clientMapper;
        this.clientRepository = clientRepository;
    }

    public ClientReadModel addClient(ClientWriteModel clientWriteModel){
        Client client = clientMapper.toEntinty(clientWriteModel);

        return clientRepository.existsClientByNameOrEmailOrPhoneNumber(client.getName(),client.getEmail(),client.getPhoneNumber())
                ? null : clientMapper.toReadModel(clientRepository.save(client));
    }

    public List<ClientReadModel> getAllClients(){
        return clientMapper.map(clientRepository.findAll());
    }

    public Client updateClient(Client client){
        return clientRepository.save(client);
    }

    public void deletClientById(Long clientId){
        clientRepository.deleteById(clientId);
    }

    public Client getClientActionEntityById(Long id) {
        Optional<Client> client = clientRepository.findClientByClientId(id);
        return client.orElse(null);
    }
}
