/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.impl.holders.file.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import ru.russianpost.tracking.portal.service.backend.impl.holders.file.FileHolder;
import ru.russianpost.tracking.portal.service.backend.impl.holders.file.model.TechnicalTerm;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.Collections.emptyList;

/**
 * @author Amosov Maxim
 * @since 21.04.2021 : 15:58
 */
@Slf4j
@Component
public class TechnicalTermsHolder extends FileHolder {
    private static final TypeReference<Map<String, List<TechnicalTerm>>> TYPE_REFERENCE = new TypeReference<Map<String, List<TechnicalTerm>>>() {
    };
    private Map<String, List<TechnicalTerm>> termsByLocaleMap = new HashMap<>();

    /**
     * @param technicalTermsPath path to technicalTerms
     */
    public TechnicalTermsHolder(@Value("${technical-terms.path}") final String technicalTermsPath) {
        log.info("Initializing technicalTerms holder! technicalTermsPath = '{}'", technicalTermsPath);
        try {
            final ObjectMapper mapper = new ObjectMapper();
            termsByLocaleMap = mapper.readValue(getFile(technicalTermsPath), TYPE_REFERENCE);
            log.info("TechnicalTerms holder initialized with '{}' 'ru' and '{}' 'en' terms.",
                termsByLocaleMap.get("ru").size(), termsByLocaleMap.get("en").size());
        } catch (final Exception e) {
            log.error("TechnicalTerms holder initialization error", e);
        }
    }

    /**
     * @param langCode lang code
     * @return technical terms by locale
     */
    public List<TechnicalTerm> getTermsByLocaleCode(final String langCode) {
        return termsByLocaleMap.getOrDefault(langCode, emptyList());
    }
}
