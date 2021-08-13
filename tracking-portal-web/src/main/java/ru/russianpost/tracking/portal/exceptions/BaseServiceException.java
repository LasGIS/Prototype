/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.exceptions;

import lombok.Getter;
import ru.russianpost.tracking.portal.controller.dto.ErrorType;

/**
 * @author Amosov Maxim
 * @since 24.05.2021 : 9:59
 */
@Getter
public class BaseServiceException extends RuntimeException {
    private final ErrorType type;

    /**
     * @param message exception message
     * @param type    error type for UI response
     */
    public BaseServiceException(final String message, final ErrorType type) {
        super(message);
        this.type = type;
    }

    /**
     * @param message exception message
     * @param cause   cause
     * @param type    error type for UI response
     */
    public BaseServiceException(final String message, final Throwable cause, final ErrorType type) {
        super(message, cause);
        this.type = type;
    }
}
