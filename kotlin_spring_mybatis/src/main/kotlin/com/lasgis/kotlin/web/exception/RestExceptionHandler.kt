/*
 * Copyright (c) 2020. Prototype
 */
package com.lasgis.kotlin.web.exception

import com.lasgis.kotlin.web.dto.ErrorDto
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

/**
 * @author dsshevchenko
 * @since <pre>1/15/2018</pre>
 */
@ControllerAdvice
class RestExceptionHandler : ResponseEntityExceptionHandler() {

    /**
     * System error exception handler
     *
     * @param ex exception
     * @return response entity
     */
    @ExceptionHandler(WebException::class)
    protected fun webException(ex: WebException): ResponseEntity<ErrorDto> {
        when (ex.cause) {
            null -> this.logger.warn(ex.message)
            else -> this.logger.warn(ex.message, ex.cause)
        }
        return ResponseEntity.status(ex.httpStatus)
            .body(ErrorDto(ex.messageCode, ex.message))
    }

    /**
     * Unknown system error exception handler
     *
     * @param ex exception
     * @return response entity
     */
    @ExceptionHandler(Exception::class)
    protected fun unknownSystemException(ex: Exception?): ResponseEntity<ErrorDto> {
        this.logger.error("Internal Error", ex)
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(ErrorDto(0, "Системная ошибка приложения"))
    }

    /**
     * Spring security access denied error handler
     *
     * @param ex exception
     * @return response entity
     */
    @ExceptionHandler(AccessDeniedException::class)
    protected fun accessDeniedException(ex: Exception?): ResponseEntity<ErrorDto> {
        this.logger.error("Access denied error", ex)
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(ErrorDto(0, "Данная операция вам не доступна"))
    }

}
