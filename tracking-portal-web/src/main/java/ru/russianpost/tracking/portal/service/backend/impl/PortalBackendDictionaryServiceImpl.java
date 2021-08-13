/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.impl;

import com.google.common.collect.ImmutableMap;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.russianpost.tracking.portal.service.backend.PortalBackendDictionaryService;
import ru.russianpost.tracking.portal.service.backend.PortalBackendOperAttributesBuilder;
import ru.russianpost.tracking.portal.service.backend.impl.holders.file.impl.EventTypeDescriptionsHolder;
import ru.russianpost.tracking.portal.service.backend.impl.holders.file.impl.TechnicalTermsHolder;
import ru.russianpost.tracking.portal.service.backend.impl.holders.file.model.TechnicalTerm;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.AbstractDictionaryHolder;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.LocalizedHolder;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.impl.CountryHolder;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.impl.PostMarkHolder;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.DictionaryDto;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.EventTypeDto;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.OperTypeWithAttributeDto;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.PostMarkDto;
import ru.russianpost.tracking.web.model.info.CountryInfo;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author Amosov Maxim
 * @since 19.04.2021 : 15:30
 */
@Service
@RequiredArgsConstructor
public class PortalBackendDictionaryServiceImpl implements PortalBackendDictionaryService {
    private static final Map<String, String> LOCALE_MAP = ImmutableMap.of("ru", "RUS", "en", "ENG");

    private final LocalizedHolder sendCategoryHolder;
    private final LocalizedHolder mailTypeHolder;
    private final LocalizedHolder mailCategoryHolder;
    private final LocalizedHolder mailRankHolder;
    private final LocalizedHolder postalOrderEventTypeHolder;
    private final PostMarkHolder postMarkHolder;
    private final CountryHolder countryHolder;
    private final TechnicalTermsHolder technicalTermsHolder;
    private final EventTypeDescriptionsHolder descriptionsHolder;
    private final List<AbstractDictionaryHolder<?>> dictionaryHolders;
    private final PortalBackendOperAttributesBuilder operAttributesBuilder;

    @Override
    public List<DictionaryDto> getSendCategories(final String langCode) {
        return sendCategoryHolder.getListByLocaleCode(mapCode(langCode));
    }

    @Override
    public List<DictionaryDto> getMailTypes(final String langCode) {
        return mailTypeHolder.getListByLocaleCode(mapCode(langCode));
    }

    @Override
    public List<DictionaryDto> getMailCategories(final String langCode) {
        return mailCategoryHolder.getListByLocaleCode(mapCode(langCode));
    }

    @Override
    public List<DictionaryDto> getMailRanks(final String langCode) {
        return mailRankHolder.getListByLocaleCode(mapCode(langCode));
    }

    @Override
    public List<EventTypeDto> getPostalOrderEventTypes(final String langCode) {
        return postalOrderEventTypeHolder.getListByLocaleCode(mapCode(langCode)).stream()
            .map(e -> new EventTypeDto(e.getCode(), e.getName(), descriptionsHolder.getDescriptionByIdAndLocale(e.getCode(), langCode)))
            .collect(Collectors.toList());
    }

    @Override
    public List<OperTypeWithAttributeDto> getOperTypeWithAttributes(final String langCode) {
        return operAttributesBuilder.build(mapCode(langCode));
    }

    @Override
    public List<PostMarkDto> getPostMarks(final String langCode) {
        return postMarkHolder.getListByLocaleCode(mapCode(langCode));
    }

    @Override
    public List<CountryInfo> getCountries(final String langCode) {
        return countryHolder.getCountries();
    }

    @Override
    public List<TechnicalTerm> getTechnicalTerms(final String langCode) {
        return technicalTermsHolder.getTermsByLocaleCode(langCode);
    }

    @Override
    public void reloadDictionaryHolders() {
        dictionaryHolders.forEach(AbstractDictionaryHolder::load);
    }

    private String mapCode(final String langCode) {
        return LOCALE_MAP.getOrDefault(langCode, "RUS");
    }
}
