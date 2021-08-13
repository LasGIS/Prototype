/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.config.backend;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.AbstractJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;

/**
 * @author Amosov Maxim
 * @since 31.03.2021 : 10:22
 */
@Configuration
public class PortalBackendConfig {
    @Bean
    @Qualifier("portalBackendRestTemplate")
    public RestTemplate portalBackendRestTemplate(
        final AbstractJackson2HttpMessageConverter jacksonMessageConverter,
        final StringHttpMessageConverter stringMessageConverter,
        final ClientHttpRequestInterceptor loggingInterceptor
    ) {
        final SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(5000);
        requestFactory.setReadTimeout(5000);

        final RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new BufferingClientHttpRequestFactory(requestFactory));
        restTemplate.setMessageConverters(asList(stringMessageConverter, jacksonMessageConverter));
        restTemplate.setInterceptors(singletonList(loggingInterceptor));
        return restTemplate;
    }

    @Bean
    @Qualifier("statisticsRestTemplate")
    public RestTemplate statisticsRestTemplate(
        final AbstractJackson2HttpMessageConverter jacksonMessageConverter,
        final StringHttpMessageConverter stringMessageConverter,
        final ClientHttpRequestInterceptor loggingInterceptor
    ) {
        final RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory()));
        restTemplate.setMessageConverters(asList(stringMessageConverter, jacksonMessageConverter));
        restTemplate.setInterceptors(singletonList(loggingInterceptor));
        return restTemplate;
    }
}
