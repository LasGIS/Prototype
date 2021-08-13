/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model;

import lombok.Getter;
import lombok.Setter;

/**
 * @param <K> type of key
 * @param <V> type of value
 * @author Amosov Maxim
 * @since 19.04.2021 : 17:42
 */
@Getter
@Setter
public class SimpleKeyValue<K, V> {
    private K key;
    private V value;
}
