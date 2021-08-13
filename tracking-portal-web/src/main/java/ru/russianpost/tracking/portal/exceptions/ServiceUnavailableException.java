/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.exceptions;

import ru.russianpost.tracking.portal.controller.dto.ErrorType;

/**
 * @author Amosov Maxim
 * @since 30.03.2021 : 17:47
 */
public class ServiceUnavailableException extends BaseServiceException {
    /**
     * Creates new instance caused by any throwable
     *
     * @param serviceUrl external service url throwing exception
     * @param cause      cause
     */
    public ServiceUnavailableException(final String serviceUrl, final Throwable cause) {
        super("Service unavailable: " + serviceUrl, cause, ErrorType.SERVICE_UNAVAILABLE);
    }
}
