/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.config.logging;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMessage;
import org.springframework.http.HttpRequest;
import org.springframework.http.MediaType;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Optional;

import static java.nio.charset.StandardCharsets.UTF_8;

/**
 * Interceptor for logging http requests and responses
 *
 * @author Amosov Maxim
 * @since 11.04.2021 : 21:53
 */
@Slf4j
@Component
public class LoggingInterceptor implements ClientHttpRequestInterceptor {
    @Override
    public ClientHttpResponse intercept(
        final HttpRequest request,
        final byte[] body,
        final ClientHttpRequestExecution execution
    ) throws IOException {
        logRequest(request, body);
        final ClientHttpResponse response = execution.execute(request, body);
        logResponse(response);
        return response;
    }

    private void logRequest(HttpRequest request, byte[] body) {
        if (log.isDebugEnabled()) {
            log.debug("========================request begin==========================");
            log.debug("URI         : {}", request.getURI());
            log.debug("Method      : {}", request.getMethod());
            log.debug("Headers     : {}", request.getHeaders());
            log.debug("Request body: {}", new String(body, getCharset(request)));
            log.debug("========================request end============================");
        }
    }

    private void logResponse(ClientHttpResponse response) throws IOException {
        if (log.isDebugEnabled()) {
            log.debug("========================response begin==========================");
            log.debug("Status code  : {}", response.getStatusCode());
            log.debug("Status text  : {}", response.getStatusText());
            log.debug("Headers      : {}", response.getHeaders());
            log.debug("Response body: {}", StreamUtils.copyToString(response.getBody(), getCharset(response)));
            log.debug("========================response end============================");
        }
    }

    private Charset getCharset(HttpMessage message) {
        return Optional.ofNullable(message.getHeaders().getContentType())
            .map(MediaType::getCharset)
            .orElse(UTF_8);
    }
}
