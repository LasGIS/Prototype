/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.utils;

import lombok.experimental.UtilityClass;
import org.jetbrains.annotations.Nullable;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import ru.russianpost.pochtaid.sso.vo2.Person2;
import ru.russianpost.tracking.portal.config.oauth.User;
import ru.russianpost.tracking.portal.exceptions.UserNotAuthorizedException;
import ru.russianpost.tracking.portal.service.backend.model.PortalBackendUser;

import javax.servlet.http.HttpServletRequest;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;
import static java.util.Optional.ofNullable;

/**
 * @author Amosov Maxim
 * @since 31.03.2021 : 10:26
 */
@UtilityClass
public class UserUtils {
    /**
     * Extracts User from HttpServletRequest
     *
     * @param request instance of {@link HttpServletRequest}
     * @return authorized User or throw {@link UserNotAuthorizedException}
     */
    public User getUser(final HttpServletRequest request) {
        final OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) request.getUserPrincipal();
        return (User) ofNullable(token).orElseThrow(UserNotAuthorizedException::new).getPrincipal();
    }

    /**
     * Extracts Person2 from request
     *
     * @param request instance of {@link HttpServletRequest}
     * @return Person2
     * @throws UserNotAuthorizedException User not authorized Exception
     */
    public Person2 getPerson(final HttpServletRequest request) {
        final User user = getUser(request);
        return ofNullable(user).orElseThrow(UserNotAuthorizedException::new).getPerson();
    }

    /**
     * Extracts PortalBackendUser from request
     *
     * @param request instance of {@link HttpServletRequest}
     * @return PortalBackendUser or null if token is null
     */
    @Nullable
    public PortalBackendUser getBackendUser(final HttpServletRequest request) {
        final User user = getUser(request);
        return isNull(user) ? null : user.getBackendUser();
    }

    /**
     * @param request instance of {@link HttpServletRequest}
     * @return true if user authorized in portal backend, false otherwise
     */
    public boolean isAuthorizedInBackend(final HttpServletRequest request) {
        return nonNull(getBackendUser(request));
    }
}
