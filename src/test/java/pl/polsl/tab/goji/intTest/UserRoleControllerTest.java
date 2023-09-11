package pl.polsl.tab.goji.intTest;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import pl.polsl.tab.goji.Common.TestData;
import pl.polsl.tab.goji.model.entity.UserRole;
import pl.polsl.tab.goji.repository.UserRoleRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserRoleControllerTest extends TestData {
    @LocalServerPort
    int port;

    @Autowired
    TestRestTemplate restTemplate = new TestRestTemplate();

    @Autowired
    UserRoleRepository userRoleRepository;

    @AfterEach
    public void cleanup() {
        userRoleRepository.deleteAll();
    }

    @Test
    public void getAllUserRolesTest() {
        //Given
        String url = String.format(URL_USER_ROLE_PATTERN, port);
        populateDataBase();
        //When
        ResponseEntity<List<UserRole>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<UserRole>>(){});
        List<UserRole> responseBody = response.getBody();
        //Then
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, responseBody.size());
    }

    @Test
    public void addUserRoleTest() {
        //Given
        String name = "role";
        HttpEntity<Object> httpEntity = prepareEntity(name);
        String url = String.format(URL_USER_ROLE_NAME_PATTERN, port, name);

        //When
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, httpEntity, String.class);

        //Then
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    private void populateDataBase() {
        String name = "firstRole";
        String url = String.format(URL_USER_ROLE_NAME_PATTERN, port, name);
        HttpEntity<Object> httpEntity = prepareEntity(name);
        restTemplate.exchange(url, HttpMethod.POST, httpEntity, String.class);

        name = "secondName";
        url = String.format(URL_USER_ROLE_NAME_PATTERN, port, name);
        httpEntity = prepareEntity(name);
        restTemplate.exchange(url, HttpMethod.POST, httpEntity, String.class);
    }
}
