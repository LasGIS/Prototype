/*
 * Copyright (c) 2021. Prototype
 */

package ru.russianpost.tracking.portal.exceptions;

import ru.russianpost.tracking.portal.controller.dto.ErrorType;

/**
 * The Class UserNotAuthorizedException definition.
 *
 * @author Vladimir Laskin
 * @since 20.05.2021 : 1:02
 */
public class UserNotAuthorizedException extends BaseServiceException {
    /**
     * Creates new instance of exception
     */
    public UserNotAuthorizedException() {
        super("User is not authorized!", ErrorType.USER_UNAUTHORIZED);
    }

    /**
     * Creates new instance of exception caused by another throwable
     *
     * @param cause cause
     */
    public UserNotAuthorizedException(final Exception cause) {
        super("User is not authorized!", cause, ErrorType.USER_UNAUTHORIZED);
    }
}
