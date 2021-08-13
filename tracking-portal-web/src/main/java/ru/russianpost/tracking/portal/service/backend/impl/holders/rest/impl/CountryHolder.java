/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.impl.holders.rest.impl;

import lombok.Getter;
import org.springframework.stereotype.Component;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.AbstractDictionaryHolder;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.RestHolderConfig;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.response.CountryResponse;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.response.DictionaryResponse;
import ru.russianpost.tracking.web.model.info.CountryInfo;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Optional.ofNullable;

/**
 * @author Amosov Maxim
 * @since 20.04.2021 : 16:30
 */
@Getter
@Component
public class CountryHolder extends AbstractDictionaryHolder<CountryInfo> {
    private volatile List<CountryInfo> countries;

    /**
     * @param holderConfig rest holder config
     */
    public CountryHolder(final RestHolderConfig holderConfig) {
        super(buildDictionaryUri(holderConfig.getDictionaryUrl(), "countries"), holderConfig.getRestTemplate());
    }

    @Override
    protected void processResponse(String uri, DictionaryResponse<CountryInfo> response) {
        countries = ofNullable(response.getItems()).orElseGet(Collections::emptyList).stream()
            .sorted(Comparator.comparing(CountryInfo::getNameRu))
            .collect(Collectors.toList());

        getLog().info("Loaded dictionary {} entries: {}", uri, countries.size());
    }

    @Override
    protected Class<? extends DictionaryResponse<CountryInfo>> responseType() {
        return CountryResponse.class;
    }
}
