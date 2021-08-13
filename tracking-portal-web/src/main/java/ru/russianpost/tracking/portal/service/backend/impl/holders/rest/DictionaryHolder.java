/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.impl.holders.rest;

import lombok.Getter;
import org.springframework.web.client.RestTemplate;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.response.DictionaryResponse;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import static java.util.Objects.requireNonNull;
import static java.util.Optional.ofNullable;
import static java.util.stream.Collectors.toMap;

/**
 * @param <K>         map key type
 * @param <V>         map entry value type
 * @param <ItemsType> type of response items
 * @author Amosov Maxim
 * @since 19.04.2021 : 16:30
 */
@Getter
public abstract class DictionaryHolder<K, V, ItemsType> extends AbstractDictionaryHolder<ItemsType> {
    private volatile Map<K, V> map = new HashMap<>();
    private volatile List<ItemsType> list = new ArrayList<>();

    private final Function<ItemsType, K> itemsKeyMapper;
    private final Function<ItemsType, V> itemsValueMapper;

    /**
     * @param uri              uri
     * @param restTemplate     restTemplate
     * @param itemsKeyMapper   keyMapper
     * @param itemsValueMapper valueMapper
     */
    protected DictionaryHolder(
        final String uri,
        final RestTemplate restTemplate,
        final Function<ItemsType, K> itemsKeyMapper,
        final Function<ItemsType, V> itemsValueMapper
    ) {
        super(uri, restTemplate);
        this.itemsKeyMapper = requireNonNull(itemsKeyMapper);
        this.itemsValueMapper = requireNonNull(itemsValueMapper);
    }

    @Override
    protected void processResponse(final String uri, final DictionaryResponse<ItemsType> response) {
        this.list = ofNullable(response.getItems()).orElseGet(Collections::emptyList);

        getLog().info("Loaded dictionary {} entries: {}", uri, list.size());
        this.map = this.list.stream().collect(toMap(this.itemsKeyMapper, this.itemsValueMapper, (value1, value2) -> {
            getLog().warn("Duplicate key found: {}", itemsKeyMapper.apply((ItemsType) value1));
            return value1;
        }));
    }
}
