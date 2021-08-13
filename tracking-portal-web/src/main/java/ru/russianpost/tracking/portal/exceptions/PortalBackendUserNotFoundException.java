/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.exceptions;

import ru.russianpost.tracking.portal.controller.dto.ErrorType;

/**
 * @author Amosov Maxim
 * @since 30.03.2021 : 17:47
 */
public class PortalBackendUserNotFoundException extends BaseServiceException {
    /**
     * Creates new instance of exception cause by another throwable
     *
     * @param hid   hid of not found user
     * @param cause cause
     */
    public PortalBackendUserNotFoundException(final String hid, final Throwable cause) {
        super("Portal Backend User not found. hid = " + hid, cause, ErrorType.PORTAL_BACKEND_USER_NOT_FOUND);
    }
}
