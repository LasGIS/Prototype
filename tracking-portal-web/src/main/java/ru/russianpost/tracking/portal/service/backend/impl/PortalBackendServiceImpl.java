/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import ru.russianpost.tracking.portal.exceptions.InternalServerErrorException;
import ru.russianpost.tracking.portal.exceptions.PortalBackendUserAlreadyExistsException;
import ru.russianpost.tracking.portal.exceptions.PortalBackendUserNotFoundException;
import ru.russianpost.tracking.portal.exceptions.ServiceUnavailableException;
import ru.russianpost.tracking.portal.service.backend.PortalBackendService;
import ru.russianpost.tracking.portal.service.backend.model.PortalBackendCompany;
import ru.russianpost.tracking.portal.service.backend.model.PortalBackendCreateUserRequest;
import ru.russianpost.tracking.portal.service.backend.model.PortalBackendUser;

import javax.annotation.PostConstruct;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.web.util.UriComponentsBuilder.fromUriString;

/**
 * @author Amosov Maxim
 * @since 30.03.2021 : 17:45
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PortalBackendServiceImpl implements PortalBackendService {
    @Qualifier("portalBackendRestTemplate")
    private final RestTemplate restTemplate;
    private final HttpHeaders headers = new HttpHeaders();

    @Value("${portal.backend.api-url}")
    private String apiUrl;

    private String resetPasswordUrl;
    private String sendAccessSettingsUrl;

    @PostConstruct
    public void init() {
        headers.setContentType(MediaType.APPLICATION_JSON);
        resetPasswordUrl = fromUriString(apiUrl)
            .path("/resetPassword")
            .build()
            .toUriString();
        sendAccessSettingsUrl = fromUriString(apiUrl)
            .path("/sendInfo")
            .build()
            .toUriString();
    }

    @Override
    public PortalBackendUser getUser(final String hid) throws PortalBackendUserNotFoundException, ServiceUnavailableException {
        return processRequest(hid, apiUrl, GET, HttpEntity.EMPTY, PortalBackendUser.class);
    }

    @Override
    public PortalBackendUser registerUser(
        final String hid,
        final boolean unlimited,
        final String email,
        final PortalBackendCompany company
    ) throws PortalBackendUserAlreadyExistsException, ServiceUnavailableException {
        final PortalBackendCreateUserRequest userRequest = new PortalBackendCreateUserRequest(email, unlimited, company);
        final HttpEntity<PortalBackendCreateUserRequest> entity = new HttpEntity<>(userRequest, headers);
        return processRequest(hid, apiUrl, HttpMethod.PUT, entity, PortalBackendUser.class);
    }

    @Override
    public void resetPassword(final String hid) throws PortalBackendUserNotFoundException, ServiceUnavailableException {
        processRequest(hid, resetPasswordUrl, POST, HttpEntity.EMPTY, Void.class);
        log.debug("Reset password for hid: {}", hid);
    }

    @Override
    public void sendAccessSettingsInfo(final String hid) throws PortalBackendUserNotFoundException, ServiceUnavailableException {
        processRequest(hid, sendAccessSettingsUrl, POST, HttpEntity.EMPTY, Void.class);
        log.debug("Send access settings info for hid: {}", hid);
    }

    private <T> T processRequest(
        final String hid,
        final String targetUrl,
        final HttpMethod method,
        final HttpEntity<?> entity,
        final Class<T> responseType
    ) {
        try {
            return restTemplate.exchange(targetUrl, method, entity, responseType, hid).getBody();
        } catch (final HttpClientErrorException ex) {
            if (ex.getStatusCode() == HttpStatus.NOT_FOUND) {
                throw new PortalBackendUserNotFoundException(hid, ex);
            }
            if (ex.getStatusCode() == HttpStatus.CONFLICT) {
                throw new PortalBackendUserAlreadyExistsException(hid, ex);
            }
            throw new InternalServerErrorException(targetUrl, ex);
        } catch (final RestClientException ex) {
            throw new ServiceUnavailableException(targetUrl, ex);
        }
    }
}
