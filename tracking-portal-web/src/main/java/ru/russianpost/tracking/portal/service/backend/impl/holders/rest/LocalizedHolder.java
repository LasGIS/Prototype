/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.impl.holders.rest;

import org.springframework.web.client.RestTemplate;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.DictionaryDto;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.SimpleKeyValue;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.response.DictionaryResponse;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.response.LocalizedResponse;
import ru.russianpost.tracking.portal.utils.CyrillicUtils;
import ru.russianpost.tracking.web.model.info.LocalizedKey;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author Amosov Maxim
 * @since 19.04.2021 : 16:29
 */
public abstract class LocalizedHolder extends DictionaryHolder<LocalizedKey, String, SimpleKeyValue<LocalizedKey, String>> {
    /**
     * @param uri          uri
     * @param restTemplate restTemplate
     */
    public LocalizedHolder(final String uri, final RestTemplate restTemplate) {
        super(
            uri,
            restTemplate,
            SimpleKeyValue::getKey,
            SimpleKeyValue::getValue
        );
    }

    @Override
    protected Class<? extends DictionaryResponse<SimpleKeyValue<LocalizedKey, String>>> responseType() {
        return LocalizedResponse.class;
    }

    /**
     * @param langCode lang code
     * @return map by locale
     */
    public Map<Integer, String> getMapByLocaleCode(final String langCode) {
        return getMap().entrySet().stream()
            .filter(e -> e.getKey().getLangCode().equals(langCode))
            .collect(Collectors.toMap(e -> e.getKey().getId(), Map.Entry::getValue));
    }

    /**
     * @param langCode lang code
     * @return list of dictionary entries by locale
     */
    public List<DictionaryDto> getListByLocaleCode(final String langCode) {
        return getList().stream()
            .filter(e -> e.getKey().getLangCode().equals(langCode))
            .filter(e -> "RUS".equals(langCode) || CyrillicUtils.isNotCyrillic(e.getValue()))
            .map(e -> new DictionaryDto(e.getKey().getId(), e.getValue()))
            .sorted(Comparator.comparing(DictionaryDto::getCode))
            .collect(Collectors.toList());
    }
}
