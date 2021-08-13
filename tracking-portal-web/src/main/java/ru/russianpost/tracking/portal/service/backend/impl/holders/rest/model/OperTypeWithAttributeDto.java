/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Amosov Maxim
 * @since 23.04.2021 : 15:39
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OperTypeWithAttributeDto {
    private Integer code;
    private String name;
    @Getter(onMethod_ = @JsonProperty("isTerminal"))
    private boolean isTerminal;
    private List<OperAttributeDto> attributes;
}
