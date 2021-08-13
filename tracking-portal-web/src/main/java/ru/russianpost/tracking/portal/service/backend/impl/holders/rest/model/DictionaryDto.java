/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * @author Amosov Maxim
 * @since 23.04.2021 : 15:11
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DictionaryDto {
    private Integer code;
    private String name;
}
