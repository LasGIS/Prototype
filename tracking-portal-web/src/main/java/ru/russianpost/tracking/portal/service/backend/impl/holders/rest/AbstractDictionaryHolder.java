/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.impl.holders.rest;

import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import ru.russianpost.tracking.portal.exceptions.dictionary.DictionaryLoadException;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.response.DictionaryResponse;

import static org.springframework.web.util.UriComponentsBuilder.fromUriString;

/**
 * @param <ItemsType> type of response items
 * @author Amosov Maxim
 * @since 19.04.2021 : 16:27
 */
public abstract class AbstractDictionaryHolder<ItemsType> {
    @Getter
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final String uri;
    private final RestTemplate restTemplate;

    /**
     * @param uri          uri
     * @param restTemplate restTemplate
     */
    protected AbstractDictionaryHolder(final String uri, final RestTemplate restTemplate) {
        this.uri = uri;
        this.restTemplate = restTemplate;
    }

    /**
     * Load dictionary from uri
     */
    public void load() {
        log.info("Loading dictionary {}...", uri);
        try {
            processResponse(uri, restTemplate.getForObject(uri, responseType()));
        } catch (final RestClientException e) {
            throw new DictionaryLoadException(uri, e);
        }
    }

    /**
     * @param partUri  uri of part of dictionary
     * @param response received response
     */
    protected abstract void processResponse(String partUri, DictionaryResponse<ItemsType> response);

    /**
     * @return parametrized class of dictionary response
     */
    protected abstract Class<? extends DictionaryResponse<ItemsType>> responseType();

    /**
     * @param url            base url
     * @param dictionaryName dictionaryName
     * @return dictionary uri
     */
    protected static String buildDictionaryUri(final String url, final String dictionaryName) {
        return fromUriString(url).path(dictionaryName).build().toUriString();
    }
}
