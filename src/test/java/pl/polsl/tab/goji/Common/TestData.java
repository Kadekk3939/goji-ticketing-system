package pl.polsl.tab.goji.Common;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

public class TestData {

    public static final String URL_CLIENT_PATTERN = "http://localhost:%s/client";
    public static final String URL_CLIENT_ID_PATTERN = "http://localhost:%s/client/%s";
    public static final String URL_USER_ROLE_NAME_PATTERN = "http://localhost:%s/userRole/%s";
    public static final String URL_USER_ROLE_PATTERN = "http://localhost:%s/userRole";

    public static HttpEntity<Object> prepareEntity(final Object entityBody) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new HttpEntity<>(entityBody, headers);
    }
}
