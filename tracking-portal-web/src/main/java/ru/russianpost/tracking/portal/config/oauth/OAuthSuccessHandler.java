/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.config.oauth;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static java.util.Objects.nonNull;

/**
 * @author Amosov Maxim
 * @since 30.03.2021 : 17:34
 */
@Slf4j
@Component
public class OAuthSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    @Override
    protected String determineTargetUrl(
        final HttpServletRequest request,
        final HttpServletResponse response,
        final Authentication authentication
    ) {
        final User user = getUser(authentication);
        return nonNull(user.getBackendUser()) ? "/statistics" : "/";
    }

    @Override
    public void onAuthenticationSuccess(
        final HttpServletRequest request,
        final HttpServletResponse response,
        final Authentication authentication
    ) throws ServletException, IOException {
        super.onAuthenticationSuccess(request, response, authentication);
        log.info("Authentication success! user = {}", getUser(authentication));
    }

    private User getUser(final Authentication authentication) {
        return (User) authentication.getPrincipal();
    }
}
