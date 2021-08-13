/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model;

import lombok.Getter;

/**
 * @author Amosov Maxim
 * @since 29.04.2021 : 12:14
 */
@Getter
public class EventTypeDto extends DictionaryDto {
    private final String description;

    /**
     * @param code        code
     * @param name        name
     * @param description description
     */
    public EventTypeDto(final Integer code, final String name, final String description) {
        super(code, name);
        this.description = description;
    }
}
