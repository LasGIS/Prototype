/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.russianpost.tracking.portal.service.backend.PortalBackendDictionaryService;
import ru.russianpost.tracking.portal.service.backend.impl.holders.file.model.TechnicalTerm;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.DictionaryDto;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.EventTypeDto;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.OperTypeWithAttributeDto;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.PostMarkDto;
import ru.russianpost.tracking.web.model.info.CountryInfo;

import java.util.List;

/**
 * @author Amosov Maxim
 * @since 26.04.2021 : 14:52
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/public-api/v1.0/dictionary")
public class DictionaryController extends BaseController {
    private final PortalBackendDictionaryService backendDictionaryService;

    /**
     * @param langCode 'ru' or 'en'
     * @return list of operation type with attributes
     */
    @GetMapping("operation-codes")
    public List<OperTypeWithAttributeDto> operationCodes(final String langCode) {
        return backendDictionaryService.getOperTypeWithAttributes(langCode);
    }

    /**
     * @param langCode 'ru' or 'en'
     * @return list of mail categories
     */
    @GetMapping("category-codes")
    public List<DictionaryDto> categoryCodes(final String langCode) {
        return backendDictionaryService.getMailCategories(langCode);
    }

    /**
     * @param langCode 'ru' or 'en'
     * @return list of mail ranks
     */
    @GetMapping("mailrank")
    public List<DictionaryDto> mailRanks(final String langCode) {
        return backendDictionaryService.getMailRanks(langCode);
    }

    /**
     * @param langCode 'ru' or 'en'
     * @return list of mail types
     */
    @GetMapping("mailtype")
    public List<DictionaryDto> mailTypes(final String langCode) {
        return backendDictionaryService.getMailTypes(langCode);
    }

    /**
     * @param langCode 'ru' or 'en'
     * @return list of post marks
     */
    @GetMapping("postmark")
    public List<PostMarkDto> postMarks(final String langCode) {
        return backendDictionaryService.getPostMarks(langCode);
    }

    /**
     * @param langCode 'ru' or 'en'
     * @return list of countries
     */
    @GetMapping("countries")
    public List<CountryInfo> countries(final String langCode) {
        return backendDictionaryService.getCountries(langCode);
    }

    /**
     * @param langCode 'ru' or 'en'
     * @return list of send categories
     */
    @GetMapping("send-ctg")
    public List<DictionaryDto> sendCtg(final String langCode) {
        return backendDictionaryService.getSendCategories(langCode);
    }

    /**
     * @param langCode 'ru' or 'en'
     * @return list of countries event types
     */
    @GetMapping("event-type")
    public List<EventTypeDto> eventType(final String langCode) {
        return backendDictionaryService.getPostalOrderEventTypes(langCode);
    }

    /**
     * @param langCode 'ru' or 'en'
     * @return list of special terms
     */
    @GetMapping("special-terms")
    public List<TechnicalTerm> specialTerms(final String langCode) {
        return backendDictionaryService.getTechnicalTerms(langCode);
    }
}
