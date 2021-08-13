/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import ru.russianpost.tracking.portal.exceptions.dictionary.DictionaryInitException;
import ru.russianpost.tracking.portal.service.backend.PortalBackendDictionaryActualizer;
import ru.russianpost.tracking.portal.service.backend.PortalBackendDictionaryService;

import java.util.Objects;
import java.util.concurrent.atomic.AtomicReference;

import static org.springframework.web.util.UriComponentsBuilder.fromUriString;

/**
 * @author Amosov Maxim
 * @since 20.04.2021 : 14:10
 */
@Slf4j
@Component
@EnableScheduling
public class PortalBackendDictionaryActualizerImpl implements PortalBackendDictionaryActualizer {
    private final String versionUrl;
    private final RestTemplate restTemplate;
    private final PortalBackendDictionaryService backendDictionaryService;
    private final AtomicReference<String> backendVersion = new AtomicReference<>();

    /**
     * @param rootUrl                  base portal backend url
     * @param restTemplate             portalBackendRestTemplate
     * @param backendDictionaryService backendDictionaryService
     */
    public PortalBackendDictionaryActualizerImpl(
        @Value("${portal.backend.root-url}") final String rootUrl,
        @Qualifier("portalBackendRestTemplate") final RestTemplate restTemplate,
        final PortalBackendDictionaryService backendDictionaryService
    ) {
        this.restTemplate = restTemplate;
        this.versionUrl = fromUriString(rootUrl).path("/monitoring/version").build().toUriString();
        this.backendDictionaryService = backendDictionaryService;

        try {
            final String actualBackendVersion = getActualBackendVersion();
            this.backendDictionaryService.reloadDictionaryHolders();
            this.backendVersion.set(actualBackendVersion);
            log.info("Portal Backend service version is '{}'", this.backendVersion);
        } catch (final Exception ex) {
            throw new DictionaryInitException(ex);
        }
    }

    @Override
    @Scheduled(fixedDelay = 10 * 60 * 1000, initialDelay = 10 * 60 * 1000)
    public void actualizePortalBackendDictionaries() {
        try {
            final String newVersion = getActualBackendVersion();
            final String oldVersion = backendVersion.get();
            if (!Objects.equals(oldVersion, newVersion)) {
                this.backendDictionaryService.reloadDictionaryHolders();
                this.backendVersion.set(newVersion);
                log.info("Portal Backend service version has been changed from '{}' to '{}'", oldVersion, newVersion);
            }
        } catch (final Exception e) {
            log.warn("Fail to actualize Portal Backend Dictionaries!", e);
        }
    }

    private String getActualBackendVersion() {
        return restTemplate.getForObject(versionUrl, String.class);
    }
}
