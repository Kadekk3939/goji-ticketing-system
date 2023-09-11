package pl.polsl.tab.goji.intTest;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import pl.polsl.tab.goji.Common.TestData;
import pl.polsl.tab.goji.model.dto.read.ClientReadModel;
import pl.polsl.tab.goji.model.dto.write.ClientWriteModel;
import pl.polsl.tab.goji.repository.ClientRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ClientControllerTest extends TestData {

    @LocalServerPort
    int port;

    @Autowired
    TestRestTemplate restTemplate = new TestRestTemplate();

    @Autowired
    ClientRepository clientRepository;

    @AfterEach
    public void cleanup() {
        clientRepository.deleteAll();
    }

    @Test
    public void addClientTest(){
        //Given
        ClientWriteModel requestBody = new ClientWriteModel("name", "test@email.com", "111-222-333");
        HttpEntity<Object> httpEntity = prepareEntity(requestBody);
        String url = String.format(URL_CLIENT_PATTERN, port);

        //When
        ResponseEntity<ClientReadModel> response = restTemplate.exchange(url, HttpMethod.POST, httpEntity, ClientReadModel.class);

        //Then
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void getAllClientsTest(){
        //Given
        String url = String.format(URL_CLIENT_PATTERN, port);
        populateDataBase(url);
        //When
        ResponseEntity<List<ClientReadModel>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ClientReadModel>>(){});
        List<ClientReadModel> responseBody = response.getBody();
        //Then
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, responseBody.size());
    }

    @Test
    public void getClientByIdTest(){
        //Given
        populateDataBase(String.format(URL_CLIENT_PATTERN, port));
        String id = getId(String.format(URL_CLIENT_PATTERN, port)).toString();
        String url = String.format(URL_CLIENT_ID_PATTERN, port, id);
        //When
        ResponseEntity<ClientReadModel> response = restTemplate.exchange(url, HttpMethod.GET, null, ClientReadModel.class);
        ClientReadModel responseBody = response.getBody();
        //Then
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("name", responseBody.getName());
        assertEquals("test@email.com", responseBody.getEmail());
        assertEquals("111-222-333", responseBody.getPhoneNumber());
    }

    @Test
    public void updateClientTest(){
        //Given
        populateDataBase(String.format(URL_CLIENT_PATTERN, port));
        Long id = getId(String.format(URL_CLIENT_PATTERN, port));
        String url = String.format(URL_CLIENT_ID_PATTERN, port, id.toString());
        ClientWriteModel requestBody = new ClientWriteModel("updatedName", "updated@email.com", "999-999-999");
        HttpEntity<Object> httpEntity = prepareEntity(requestBody);
        //When
        ResponseEntity<ClientReadModel> response = restTemplate.exchange(url, HttpMethod.PUT, httpEntity, ClientReadModel.class);
        ClientReadModel responseBody = response.getBody();
        //Then
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(id, responseBody.getClientId());
        assertEquals("updatedName", responseBody.getName());
        assertEquals("updated@email.com", responseBody.getEmail());
        assertEquals("999-999-999", responseBody.getPhoneNumber());
    }

    private void populateDataBase(String url) {
        ClientWriteModel firstRequest = new ClientWriteModel("name", "test@email.com", "111-222-333");
        ClientWriteModel secondRequest = new ClientWriteModel("second_name", "another@email.com", "444-555-666");
        HttpEntity<Object> httpEntity = prepareEntity(firstRequest);
        HttpEntity<Object> secondHttpEntity = prepareEntity(secondRequest);
        restTemplate.exchange(url, HttpMethod.POST, httpEntity, String.class);
        restTemplate.exchange(url, HttpMethod.POST, secondHttpEntity, String.class);
    }

    private Long getId(String url) {
        ResponseEntity<List<ClientReadModel>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ClientReadModel>>(){});
        List<ClientReadModel> body = response.getBody();

        return body.get(0).getClientId();
    }
}
