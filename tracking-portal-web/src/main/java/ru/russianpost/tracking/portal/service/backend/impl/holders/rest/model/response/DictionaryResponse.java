/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * @param <ItemsType> type of item element
 * @author Amosov Maxim
 * @since 19.04.2021 : 17:41
 */
@Getter
@Setter
public class DictionaryResponse<ItemsType> {
    private List<ItemsType> items;
}
