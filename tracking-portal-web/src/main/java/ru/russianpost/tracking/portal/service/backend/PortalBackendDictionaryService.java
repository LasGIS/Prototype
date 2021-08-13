/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend;

import ru.russianpost.tracking.portal.service.backend.impl.holders.file.model.TechnicalTerm;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.DictionaryDto;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.EventTypeDto;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.OperTypeWithAttributeDto;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.PostMarkDto;
import ru.russianpost.tracking.web.model.info.CountryInfo;

import java.util.List;

/**
 * @author Amosov Maxim
 * @since 19.04.2021 : 15:28
 */
public interface PortalBackendDictionaryService {
    /**
     * @param langCode lang code
     * @return sender categories list
     */
    List<DictionaryDto> getSendCategories(String langCode);

    /**
     * @param langCode lang code
     * @return mail types list
     */
    List<DictionaryDto> getMailTypes(String langCode);

    /**
     * @param langCode lang code
     * @return mail categories list
     */
    List<DictionaryDto> getMailCategories(String langCode);

    /**
     * @param langCode lang code
     * @return mail ranks list
     */
    List<DictionaryDto> getMailRanks(String langCode);

    /**
     * @param langCode lang code
     * @return postal order event types list
     */
    List<EventTypeDto> getPostalOrderEventTypes(String langCode);

    /**
     * @param langCode lang code
     * @return operation types with attributes
     */
    List<OperTypeWithAttributeDto> getOperTypeWithAttributes(String langCode);

    /**
     * @param langCode lang code
     * @return post marks list
     */
    List<PostMarkDto> getPostMarks(String langCode);

    /**
     * @param langCode lang code
     * @return countries list
     */
    List<CountryInfo> getCountries(String langCode);

    /**
     * @param langCode lang code
     * @return technical terms list
     */
    List<TechnicalTerm> getTechnicalTerms(String langCode);

    /**
     * Reload all dictionary holders
     */
    void reloadDictionaryHolders();
}
