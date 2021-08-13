/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.exceptions;

import ru.russianpost.tracking.portal.controller.dto.ErrorType;

/**
 * @author Amosov Maxim
 * @since 31.03.2021 : 18:15
 */
public class PortalBackendUserAlreadyExistsException extends BaseServiceException {
    /**
     * Creates new instance of exception caused by another throwable
     *
     * @param hid   hid of user that already exists
     * @param cause cause
     */
    public PortalBackendUserAlreadyExistsException(final String hid, final Throwable cause) {
        super("Portal Backend User already exists. hid = " + hid, cause, ErrorType.PORTAL_BACKEND_USER_ALREADY_EXISTS);
    }
}
