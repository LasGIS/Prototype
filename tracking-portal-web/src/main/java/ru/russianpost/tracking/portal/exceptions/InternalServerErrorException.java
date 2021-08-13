/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.exceptions;

import lombok.Getter;
import org.springframework.web.client.HttpStatusCodeException;
import ru.russianpost.tracking.portal.controller.dto.ErrorType;

/**
 * @author Amosov Maxim
 * @since 31.03.2021 : 10:24
 */
public class InternalServerErrorException extends BaseServiceException {
    @Getter
    private final HttpStatusCodeException httpStatusCodeException;

    /**
     * Creates new instance caused by http status code exception
     *
     * @param targetUrl url which throws error
     * @param cause     http status code exception
     */
    public InternalServerErrorException(final String targetUrl, final HttpStatusCodeException cause) {
        super("Error requesting: " + targetUrl, cause, ErrorType.INTERNAL_SERVER_ERROR);
        this.httpStatusCodeException = cause;
    }
}
