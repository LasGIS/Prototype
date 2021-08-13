/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.exceptions;

import ru.russianpost.tracking.portal.controller.dto.ErrorType;

/**
 * @author Amosov Maxim
 * @since 31.03.2021 : 18:17
 */
public class PostIdIncompleteUserProfileException extends BaseServiceException {
    /**
     * @param message exception message
     */
    public PostIdIncompleteUserProfileException(final String message) {
        super(message, ErrorType.INCOMPLETE_POST_ID_USER_PROFILE);
    }
}
