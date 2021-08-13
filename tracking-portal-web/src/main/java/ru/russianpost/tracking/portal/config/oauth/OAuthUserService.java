/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.config.oauth;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import ru.russianpost.pochtaid.sso.vo2.Person2;
import ru.russianpost.tracking.portal.exceptions.PortalBackendUserNotFoundException;
import ru.russianpost.tracking.portal.service.backend.PortalBackendService;
import ru.russianpost.tracking.portal.service.backend.model.PortalBackendUser;

/**
 * This service creates custom OAuthUser and adds Person2 and PortalBackendUser to it for later use
 *
 * @author Amosov Maxim
 * @since 30.03.2021 : 17:40
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class OAuthUserService extends DefaultOAuth2UserService {
    private final PortalBackendService portalBackendService;
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public OAuth2User loadUser(final OAuth2UserRequest userRequest) throws OAuth2AuthenticationException, AuthenticationServiceException {
        try {
            final OAuth2User authUser = super.loadUser(userRequest);
            final String userAttributeName = userRequest.getClientRegistration()
                .getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
            final Person2 postIdPerson = mapper.convertValue(authUser.getAttributes(), Person2.class);
            final PortalBackendUser backendUser = tryLoginToPortalBackend(postIdPerson);
            return new User(authUser, userAttributeName, postIdPerson, backendUser);
        } catch (final Exception ex) {
            throw new AuthenticationServiceException("Error during authentication process!", ex);
        }
    }

    private PortalBackendUser tryLoginToPortalBackend(final Person2 person) {
        try {
            return portalBackendService.getUser(person.getPersonHid());
        } catch (final PortalBackendUserNotFoundException ex) {
            log.info(ex.getMessage());
            return null;
        }
    }
}

