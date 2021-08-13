/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.config.oauth;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author Amosov Maxim
 * @since 30.03.2021 : 17:29
 */
@Slf4j
@Component
public class OAuthFailureHandler extends SimpleUrlAuthenticationFailureHandler {
    /**
     * Sets default failure url
     */
    public OAuthFailureHandler() {
        super("/503");
    }

    @Override
    public void onAuthenticationFailure(
        final HttpServletRequest request,
        final HttpServletResponse response,
        final AuthenticationException exception
    ) throws IOException, ServletException {
        log.error("Authentication failure!", exception);
        super.onAuthenticationFailure(request, response, exception);
    }
}
