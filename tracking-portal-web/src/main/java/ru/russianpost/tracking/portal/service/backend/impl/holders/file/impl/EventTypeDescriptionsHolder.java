/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.impl.holders.file.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import ru.russianpost.tracking.portal.service.backend.impl.holders.file.FileHolder;
import ru.russianpost.tracking.portal.service.backend.impl.holders.file.model.EventTypeDescription;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import static java.util.Arrays.asList;
import static org.apache.commons.lang3.StringUtils.EMPTY;

/**
 * @author Amosov Maxim
 * @since 29.04.2021 : 11:19
 */
@Slf4j
@Component
public class EventTypeDescriptionsHolder extends FileHolder {
    private Map<Integer, EventTypeDescription> descriptionsByIdMap = new HashMap<>();

    /**
     * @param descriptionsPath path to event type descriptions
     */
    public EventTypeDescriptionsHolder(@Value("${event-type-descriptions.path}") final String descriptionsPath) {
        log.info("Initializing EventTypeDescriptions holder! eventTypeDescriptionsPath = '{}'", descriptionsPath);
        try {
            final ObjectMapper mapper = new ObjectMapper();
            final List<EventTypeDescription> descriptions = asList(mapper.readValue(getFile(descriptionsPath), EventTypeDescription[].class));
            descriptionsByIdMap = descriptions.stream().collect(Collectors.toMap(EventTypeDescription::getId, Function.identity()));

            log.info("EventTypeDescriptions holder initialized with '{}' descriptions.", descriptionsByIdMap.size());
        } catch (final Exception e) {
            log.error("EventTypeDescriptions holder initialization error", e);
        }
    }

    /**
     * @param id       event type id
     * @param langCode lang code
     * @return event type description by id and locale
     */
    public String getDescriptionByIdAndLocale(final Integer id, final String langCode) {
        if (!descriptionsByIdMap.containsKey(id)) {
            return EMPTY;
        }
        return descriptionsByIdMap.get(id).getDescription().getOrDefault(langCode, EMPTY);
    }
}
