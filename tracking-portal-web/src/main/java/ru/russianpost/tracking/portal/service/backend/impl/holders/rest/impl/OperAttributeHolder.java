/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.impl.holders.rest.impl;

import org.springframework.stereotype.Component;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.DictionaryHolder;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.RestHolderConfig;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.SimpleKeyValue;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.response.DictionaryResponse;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.response.OperationAttributeResponse;
import ru.russianpost.tracking.web.model.info.LocalizedOperationKey;

import java.util.Map;

import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.toMap;

/**
 * @author Amosov Maxim
 * @since 20.04.2021 : 18:55
 */
@Component
public class OperAttributeHolder extends DictionaryHolder<LocalizedOperationKey, String, SimpleKeyValue<LocalizedOperationKey, String>> {
    /**
     * @param holderConfig rest holder config
     */
    public OperAttributeHolder(final RestHolderConfig holderConfig) {
        super(
            buildDictionaryUri(holderConfig.getDictionaryUrl(), "operAttributes"),
            holderConfig.getRestTemplate(),
            SimpleKeyValue::getKey,
            SimpleKeyValue::getValue
        );
    }

    @Override
    protected Class<? extends DictionaryResponse<SimpleKeyValue<LocalizedOperationKey, String>>> responseType() {
        return OperationAttributeResponse.class;
    }

    /**
     * @param langCode lang code
     * @return map where key is operation type and value is a map of operation attributes to its values
     */
    public Map<Integer, Map<Integer, String>> getMapByLocale(final String langCode) {
        return getMap().entrySet().stream()
            .filter(e -> e.getKey().getLangCode().equals(langCode))
            .collect(groupingBy(e -> e.getKey().getOperTypeId(), toMap(e -> e.getKey().getOperAttributeId(), Map.Entry::getValue)));
    }
}
