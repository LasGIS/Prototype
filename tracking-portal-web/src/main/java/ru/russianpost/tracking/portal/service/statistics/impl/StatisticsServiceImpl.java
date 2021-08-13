/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.statistics.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import ru.russianpost.tracking.portal.exceptions.InternalServerErrorException;
import ru.russianpost.tracking.portal.exceptions.PortalBackendUserNotFoundException;
import ru.russianpost.tracking.portal.exceptions.ServiceUnavailableException;
import ru.russianpost.tracking.portal.service.statistics.StatisticsService;
import ru.russianpost.tracking.portal.service.statistics.model.StatisticsBatchSettings;
import ru.russianpost.tracking.portal.service.statistics.model.StatisticsSettings;
import ru.russianpost.tracking.web.model.portal.statistics.ProfileStatisticFc;
import ru.russianpost.tracking.web.model.portal.statistics.ProfileStatisticRtm34;

import javax.annotation.PostConstruct;
import java.util.List;

import static java.util.Arrays.asList;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.web.util.UriComponentsBuilder.fromUriString;

/**
 * @author Amosov Maxim
 * @since 01.04.2021 : 15:48
 */
@Service
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {
    @Qualifier("statisticsRestTemplate")
    private final RestTemplate restTemplate;
    @Value("${portal.backend.api-url}")
    private final String apiUrl;

    private String statisticsUri;
    private String statisticsSettingsUri;
    private String statisticsBatchUri;
    private String statisticsBatchSettingsUri;

    @PostConstruct
    public void init() {
        statisticsUri = fromUriString(apiUrl)
            .path("/stat/rtm34")
            .build().toUriString();
        statisticsSettingsUri = fromUriString(apiUrl)
            .path("/stat/rtm34/notification/settings")
            .build().toUriString();
        statisticsBatchUri = fromUriString(apiUrl)
            .path("/stat/fc")
            .build().toUriString();
        statisticsBatchSettingsUri = fromUriString(apiUrl)
            .path("/stat/fc/notification/settings")
            .build().toUriString();
    }

    @Override
    public List<ProfileStatisticRtm34> loadStatistics(final String hid) {
        return asList(processRequest(hid, statisticsUri, GET, HttpEntity.EMPTY, ProfileStatisticRtm34[].class));
    }

    @Override
    public StatisticsSettings loadStatisticsSettings(final String hid) throws PortalBackendUserNotFoundException, ServiceUnavailableException {
        return processRequest(hid, statisticsSettingsUri, GET, HttpEntity.EMPTY, StatisticsSettings.class);
    }

    @Override
    public void saveStatisticsSettings(
        final String hid,
        final StatisticsSettings settings
    ) throws PortalBackendUserNotFoundException, ServiceUnavailableException {
        processRequest(hid, statisticsSettingsUri, POST, new HttpEntity<>(settings), Void.class);
    }

    @Override
    public List<ProfileStatisticFc> loadStatisticsBatch(final String hid) throws PortalBackendUserNotFoundException, ServiceUnavailableException {
        return asList(processRequest(hid, statisticsBatchUri, GET, HttpEntity.EMPTY, ProfileStatisticFc[].class));
    }

    @Override
    public StatisticsBatchSettings loadStatisticsBatchSettings(
        final String hid
    ) throws PortalBackendUserNotFoundException, ServiceUnavailableException {
        return processRequest(hid, statisticsBatchSettingsUri, GET, HttpEntity.EMPTY, StatisticsBatchSettings.class);
    }

    @Override
    public void saveStatisticsBatchSettings(
        final String hid,
        final StatisticsBatchSettings settings
    ) throws PortalBackendUserNotFoundException, ServiceUnavailableException {
        processRequest(hid, statisticsBatchSettingsUri, POST, new HttpEntity<>(settings), Void.class);
    }

    private <T> T processRequest(
        final String hid,
        final String targetUrl,
        final HttpMethod method,
        final HttpEntity<?> entity,
        final Class<T> responseType
    ) {
        try {
            return restTemplate.exchange(targetUrl, method, entity, responseType, hid).getBody();
        } catch (final HttpClientErrorException ex) {
            if (ex.getStatusCode() == HttpStatus.NOT_FOUND) {
                throw new PortalBackendUserNotFoundException(hid, ex);
            }
            throw new InternalServerErrorException(targetUrl, ex);
        } catch (final RestClientException ex) {
            throw new ServiceUnavailableException(targetUrl, ex);
        }
    }
}
