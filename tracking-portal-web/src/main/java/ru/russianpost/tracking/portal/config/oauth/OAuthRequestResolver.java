/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.config.oauth;

import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Amosov Maxim
 * @since 30.03.2021 : 17:39
 */
@Component
public class OAuthRequestResolver implements OAuth2AuthorizationRequestResolver {
    private static final String OAUTH_BASE_URI = "/oauth2/authorization";
    private final Map<String, Object> additionalAuthParams = new HashMap<>();
    private final OAuth2AuthorizationRequestResolver defaultAuthorizationRequestResolver;

    /**
     * OAuthRequestResolver constructor
     *
     * @param clientRegistrationRepository client registration repository
     */
    public OAuthRequestResolver(final ClientRegistrationRepository clientRegistrationRepository) {
        defaultAuthorizationRequestResolver =
            new DefaultOAuth2AuthorizationRequestResolver(clientRegistrationRepository, OAUTH_BASE_URI);
        additionalAuthParams.put("partyType", "PHYSICAL");
        additionalAuthParams.put("registration", "false");
        additionalAuthParams.put("group", "portal");
    }

    @Override
    public OAuth2AuthorizationRequest resolve(final HttpServletRequest request) {
        final OAuth2AuthorizationRequest req = defaultAuthorizationRequestResolver.resolve(request);
        return req == null ? null : addAttributes(req);
    }

    @Override
    public OAuth2AuthorizationRequest resolve(final HttpServletRequest request, final String clientRegistrationId) {
        final OAuth2AuthorizationRequest req = defaultAuthorizationRequestResolver.resolve(request, clientRegistrationId);
        return req == null ? null : addAttributes(req);
    }

    private OAuth2AuthorizationRequest addAttributes(final OAuth2AuthorizationRequest req) {
        return OAuth2AuthorizationRequest.from(req)
            .additionalParameters(additionalAuthParams)
            .build();
    }
}
