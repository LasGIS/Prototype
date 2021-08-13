/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.controller.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

/**
 * @author Amosov Maxim
 * @since 20.05.2021 : 13:15
 */
@Getter
@RequiredArgsConstructor
public enum ErrorType {
    /** User not authorized */
    USER_UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "error.message.user-unauthorized"),
    /** Service unavailable */
    SERVICE_UNAVAILABLE(HttpStatus.SERVICE_UNAVAILABLE, "error.message.external-service-unavailable"),
    /** Portal backend user not found */
    PORTAL_BACKEND_USER_NOT_FOUND(HttpStatus.INTERNAL_SERVER_ERROR, "error.message.portal-backend-user-not-found"),
    /** Portal backend user already exists */
    PORTAL_BACKEND_USER_ALREADY_EXISTS(HttpStatus.INTERNAL_SERVER_ERROR, "error.message.portal-backend-user-already-exists"),
    /** Incomplete post-id user profile */
    INCOMPLETE_POST_ID_USER_PROFILE(HttpStatus.BAD_REQUEST, "error.message.incomplete-post-id-user-profile"),
    /** Internal server error */
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "error.message.internal-server-error");

    private final HttpStatus status;
    private final String messageKey;
}
