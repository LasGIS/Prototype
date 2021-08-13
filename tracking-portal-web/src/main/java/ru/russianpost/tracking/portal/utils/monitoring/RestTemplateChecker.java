/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.utils.monitoring;

import org.springframework.http.HttpStatus;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import ru.russianpost.tracking.diagnostic.checker.Checker;
import ru.russianpost.tracking.diagnostic.model.Report;

import static java.text.MessageFormat.format;
import static ru.russianpost.tracking.diagnostic.selftest.Status.CRITICAL;

/**
 * @author MKitchenko
 * @version 1.0 22.09.2020
 */
public class RestTemplateChecker implements Checker {
    private static final String UNEXPECTED_RESPONSE_MESSAGE_PATTERN = "" +
        "Unexpected response from remote server: got status {0}, message {1}.";

    private final String testName;
    private final String url;
    private final RestTemplate restTemplate;
    private final Report reportOk;

    /**
     * Constructor
     *
     * @param testName     test name
     * @param url          checked url
     * @param restTemplate instance of {@link RestTemplate}
     */
    public RestTemplateChecker(final String testName, final String url, final RestTemplate restTemplate) {
        this.testName = testName;
        this.url = url;
        this.restTemplate = restTemplate;
        this.reportOk = new Report(testName);
    }

    @Override
    public String testName() {
        return this.testName;
    }

    @Override
    public Report diagnose() {
        try {
            final HttpStatus httpStatus = restTemplate.getForEntity(url, Void.class).getStatusCode();
            if (httpStatus.is2xxSuccessful()) {
                return reportOk;
            }
            return new Report(
                CRITICAL,
                testName,
                format(UNEXPECTED_RESPONSE_MESSAGE_PATTERN, httpStatus, httpStatus.getReasonPhrase())
            );
        } catch (final RestClientException e) {
            return new Report(CRITICAL, testName, e.getMessage());
        }
    }
}
