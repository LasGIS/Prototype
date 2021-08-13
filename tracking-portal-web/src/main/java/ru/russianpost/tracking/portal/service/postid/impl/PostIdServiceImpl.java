/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.postid.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import ru.russianpost.tracking.portal.config.postid.PostIdProperties;
import ru.russianpost.tracking.portal.exceptions.InternalServerErrorException;
import ru.russianpost.tracking.portal.exceptions.ServiceUnavailableException;
import ru.russianpost.tracking.portal.service.postid.PostIdService;
import ru.russianpost.tracking.portal.service.postid.model.PostIdMenuItem;
import ru.russianpost.tracking.portal.service.postid.model.PostIdProfile;

import javax.annotation.PostConstruct;
import java.net.URLEncoder;

import static java.nio.charset.StandardCharsets.UTF_8;
import static java.text.MessageFormat.format;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.web.util.UriComponentsBuilder.fromUriString;
import static ru.russianpost.tracking.portal.service.postid.model.PostIdMenuItem.MENU_TYPE_E;
import static ru.russianpost.tracking.portal.service.postid.model.PostIdMenuItem.MENU_TYPE_L;

/**
 * @author Amosov Maxim
 * @since 31.03.2021 : 10:28
 */
@Service
@RequiredArgsConstructor
public class PostIdServiceImpl implements PostIdService {
    @Qualifier("postIdRestTemplate")
    private final RestTemplate restTemplate;
    private final PostIdProperties props;

    private String logoutCallbackUrl;
    private String logoutUrl;
    private String userAccountUrl;
    private String statisticsUrl;
    private String infoProfileUri;
    private final HttpHeaders basicAuthHeaders = new HttpHeaders();

    @PostConstruct
    void init() {
        logoutCallbackUrl = fromUriString(props.getBaseHomeUrl())
            .path("/logout")
            .build().toUriString();
        logoutUrl = fromUriString(props.getLogoutUrl())
            .queryParam("redirect_uri", logoutCallbackUrl)
            .build().toUriString();
        statisticsUrl = fromUriString(props.getBaseHomeUrl())
            .path("/statistics")
            .build().toUriString();
        infoProfileUri = fromUriString(props.getApiUrl())
            .path("/v2.3/account/info.profile/{hid}")
            .build().toUriString();
        final String helpUrl = fromUriString(props.getBaseHomeUrl())
            .path("/support")
            .build().toUriString();
        userAccountUrl = format(props.getUserAccountUrl(), helpUrl, props.getBaseHomeUrl(), createPostIdMenu());
        basicAuthHeaders.setBasicAuth(props.getClientId(), props.getClientSecret());
    }

    @Override
    public String getLogoutUrl() {
        return logoutUrl;
    }

    @Override
    public String getUserAccountUrl() {
        return userAccountUrl;
    }

    @Override
    public PostIdProfile getUserProfile(final String hid) throws ServiceUnavailableException {
        try {
            return restTemplate.exchange(infoProfileUri, GET, new HttpEntity<>(basicAuthHeaders), PostIdProfile.class, hid).getBody();
        } catch (final HttpClientErrorException ex) {
            throw new InternalServerErrorException(infoProfileUri, ex);
        } catch (final RestClientException ex) {
            throw new ServiceUnavailableException(props.getApiUrl(), ex);
        }
    }

    @SneakyThrows
    private String createPostIdMenu() {
        final PostIdMenuItem myTracking = new PostIdMenuItem("Мой трекинг", statisticsUrl, MENU_TYPE_L);
        final PostIdMenuItem exit = new PostIdMenuItem("Выйти", logoutCallbackUrl, MENU_TYPE_E);

        final PostIdMenuItem[] menu = {myTracking, exit};
        final ObjectMapper objectMapper = new ObjectMapper();
        final String menuString = objectMapper.writeValueAsString(menu);
        final String encodedMenu = Base64Utils.encodeToString(menuString.getBytes(UTF_8));
        return URLEncoder.encode(encodedMenu, UTF_8.toString());
    }
}
