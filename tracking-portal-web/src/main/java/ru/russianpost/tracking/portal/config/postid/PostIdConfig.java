/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.config.postid;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.AbstractJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;

import static java.util.Collections.singletonList;

/**
 * @author Amosov Maxim
 * @since 31.03.2021 : 18:35
 */
@Configuration
public class PostIdConfig {
    @Bean
    @Qualifier("postIdRestTemplate")
    public RestTemplate postIdRestTemplate(
        final AbstractJackson2HttpMessageConverter jacksonMessageConverter,
        final StringHttpMessageConverter stringMessageConverter,
        final ClientHttpRequestInterceptor loggingInterceptor
    ) {
        final RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory()));
        restTemplate.setMessageConverters(Arrays.asList(stringMessageConverter, jacksonMessageConverter));
        restTemplate.setInterceptors(singletonList(loggingInterceptor));
        return restTemplate;
    }
}
