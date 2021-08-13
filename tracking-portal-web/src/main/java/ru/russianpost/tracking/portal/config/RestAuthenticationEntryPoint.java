/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import ru.russianpost.tracking.portal.exceptions.UserNotAuthorizedException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Wraps mvc 'AuthenticationException' exception in our 'UserNotAuthorizedException' and pass it to 'HandlerExceptionResolver'
 *
 * @author Amosov Maxim
 * @since 23.05.2021 : 16:04
 */
@Component
@RequiredArgsConstructor
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Qualifier("handlerExceptionResolver")
    private final HandlerExceptionResolver resolver;

    @Override
    public void commence(
        final HttpServletRequest request,
        final HttpServletResponse response,
        final AuthenticationException exception
    ) throws IOException, ServletException {
        resolver.resolveException(request, response, null, new UserNotAuthorizedException(exception));
    }
}
