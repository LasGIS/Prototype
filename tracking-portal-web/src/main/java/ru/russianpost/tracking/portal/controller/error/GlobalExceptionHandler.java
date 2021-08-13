/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.controller.error;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import ru.russianpost.tracking.portal.controller.dto.ErrorDto;
import ru.russianpost.tracking.portal.controller.dto.ErrorType;
import ru.russianpost.tracking.portal.exceptions.BaseServiceException;
import ru.russianpost.tracking.portal.exceptions.PostIdIncompleteUserProfileException;
import ru.russianpost.tracking.portal.exceptions.UserNotAuthorizedException;

import static ru.russianpost.tracking.portal.controller.dto.ErrorType.INTERNAL_SERVER_ERROR;

/**
 * @author Amosov Maxim
 * @since 01.04.2021 : 14:06
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    /**
     * Common exception handler for 'BaseServiceException'
     *
     * @param ex exception
     * @return ResponseEntity with corresponding ErrorDto
     */
    @ExceptionHandler(BaseServiceException.class)
    public ResponseEntity<ErrorDto> baseServiceException(final BaseServiceException ex) {
        log.error("Service Error!", ex);
        return response(ex.getType());
    }

    /**
     * Exception handler when incomplete user profile detected
     *
     * @param ex exception
     * @return ResponseEntity with corresponding ErrorDto
     */
    @ExceptionHandler(PostIdIncompleteUserProfileException.class)
    public ResponseEntity<ErrorDto> incompleteUserProfileException(final PostIdIncompleteUserProfileException ex) {
        log.info("Incomplete user profile detected! {}", ex.getMessage());
        return response(ex.getType());
    }

    /**
     * Exception handler for 'UserNotAuthorizedException'
     *
     * @param ex exception
     * @return ResponseEntity with corresponding ErrorDto
     */
    @ExceptionHandler(UserNotAuthorizedException.class)
    public ResponseEntity<ErrorDto> userNotAuthorizedException(final UserNotAuthorizedException ex) {
        log.debug("User not authorized!", ex);
        return response(ex.getType());
    }

    /**
     * Unknown system error exception handler
     *
     * @param ex exception
     * @return ResponseEntity with 'INTERNAL_SERVER_ERROR' error
     */
    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ErrorDto> unknownSystemException(final Exception ex) {
        log.error("Unknown system error!", ex);
        return response(INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<ErrorDto> response(final ErrorType type) {
        return ResponseEntity.status(type.getStatus()).body(ErrorDto.of(type));
    }
}
