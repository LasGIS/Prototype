/*
 * Copyright (c) 2021. Prototype
 */

package ru.russianpost.tracking.portal.controller.dto;

import lombok.Builder;
import lombok.Data;

/**
 * The Class ErrorDto definition.
 *
 * @author Vladimir Laskin
 * @since 20.05.2021 : 1:08
 */
@Data
@Builder
public class ErrorDto {
    private ErrorType type;
    private Integer status;
    private String messageKey;

    /**
     * @param type error type
     * @return ErrorDto
     */
    public static ErrorDto of(final ErrorType type) {
        return new ErrorDto(type, type.getStatus().value(), type.getMessageKey());
    }
}
