/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import ru.russianpost.tracking.diagnostic.checker.Checker;
import ru.russianpost.tracking.portal.config.postid.PostIdProperties;
import ru.russianpost.tracking.portal.utils.monitoring.RestTemplateChecker;

import java.util.concurrent.ForkJoinPool;

/**
 * @author Amosov Maxim
 * @since 04.05.2021 : 15:49
 */
@Configuration
public class MonitoringConfig {
    /**
     * @param postIdProperties PostID properties
     * @return instance of {@link Checker}
     */
    @Bean
    public Checker postIdServiceChecker(
        final PostIdProperties postIdProperties,
        @Qualifier("postIdRestTemplate") final RestTemplate restTemplate
    ) {
        return new RestTemplateChecker("PostID", postIdProperties.getPingUrl(), restTemplate);
    }

    /**
     * @param portalBackendPingUrl portalBackend ping url
     * @return instance of {@link Checker}
     */
    @Bean
    public Checker portalBackendChecker(
        @Value("${portal.backend.ping-url}") final String portalBackendPingUrl,
        @Qualifier("portalBackendRestTemplate") final RestTemplate restTemplate
    ) {
        return new RestTemplateChecker("Tracking Portal Backend", portalBackendPingUrl, restTemplate);
    }

    /**
     * @param parallelism parallelism
     * @return instance of {@link ForkJoinPool}
     */
    @Bean(destroyMethod = "shutdown")
    @Qualifier("selftestForkJoinPool")
    public ForkJoinPool forkJoinPool(@Value("${selftest.parallelism}") final int parallelism) {
        return new ForkJoinPool(parallelism);
    }
}
