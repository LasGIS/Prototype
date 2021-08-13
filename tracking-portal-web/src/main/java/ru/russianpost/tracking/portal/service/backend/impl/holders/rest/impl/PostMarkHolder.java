/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.impl.holders.rest.impl;

import org.springframework.stereotype.Component;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.DictionaryHolder;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.RestHolderConfig;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.PostMarkDto;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.SimpleKeyValue;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.response.BigIntLocalizedResponse;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.response.DictionaryResponse;
import ru.russianpost.tracking.portal.utils.CyrillicUtils;
import ru.russianpost.tracking.web.model.info.BigIntegerLocalizedKey;

import java.math.BigInteger;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author Amosov Maxim
 * @since 20.04.2021 : 17:47
 */
@Component
public class PostMarkHolder extends DictionaryHolder<BigIntegerLocalizedKey, String, SimpleKeyValue<BigIntegerLocalizedKey, String>> {
    /**
     * @param holderConfig rest holder config
     */
    public PostMarkHolder(final RestHolderConfig holderConfig) {
        super(
            buildDictionaryUri(holderConfig.getDictionaryUrl(), "postMarks"),
            holderConfig.getRestTemplate(),
            SimpleKeyValue::getKey,
            SimpleKeyValue::getValue
        );
    }

    @Override
    protected Class<? extends DictionaryResponse<SimpleKeyValue<BigIntegerLocalizedKey, String>>> responseType() {
        return BigIntLocalizedResponse.class;
    }

    /**
     * @param langCode lang code
     * @return map by locale
     */
    public Map<BigInteger, String> getMapByLocaleCode(final String langCode) {
        return getMap().entrySet().stream()
            .filter(e -> e.getKey().getLangCode().equals(langCode))
            .collect(Collectors.toMap(e -> e.getKey().getId(), Map.Entry::getValue));
    }

    /**
     * @param langCode lang code
     * @return list of dictionary entries by locale
     */
    public List<PostMarkDto> getListByLocaleCode(final String langCode) {
        return getList().stream()
            .filter(e -> e.getKey().getLangCode().equals(langCode))
            .filter(e -> "RUS".equals(langCode) || CyrillicUtils.isNotCyrillic(e.getValue()))
            .map(e -> new PostMarkDto(e.getKey().getId(), e.getValue()))
            .sorted(Comparator.comparing(PostMarkDto::getCode))
            .collect(Collectors.toList());
    }
}
