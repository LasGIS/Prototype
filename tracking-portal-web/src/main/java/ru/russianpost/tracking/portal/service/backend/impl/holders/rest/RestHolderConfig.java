/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.impl.holders.rest;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

/**
 * @author Amosov Maxim
 * @since 23.04.2021 : 12:31
 */
@Getter
@Component
@RequiredArgsConstructor
public class RestHolderConfig {
    @Value("${portal.backend.dictionary-url}")
    private final String dictionaryUrl;
    @Qualifier("portalBackendRestTemplate")
    private final RestTemplate restTemplate;
}
