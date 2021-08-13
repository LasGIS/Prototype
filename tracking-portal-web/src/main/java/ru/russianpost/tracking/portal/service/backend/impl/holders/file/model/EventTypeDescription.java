/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.impl.holders.file.model;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

/**
 * @author Amosov Maxim
 * @since 29.04.2021 : 11:44
 */
@Getter
@NoArgsConstructor
public class EventTypeDescription {
    private Integer id;
    private Map<String, String> description;
}
