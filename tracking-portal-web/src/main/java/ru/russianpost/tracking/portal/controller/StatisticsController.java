/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.russianpost.pochtaid.sso.vo2.Person2;
import ru.russianpost.tracking.portal.controller.dto.StatisticsDto;
import ru.russianpost.tracking.portal.exceptions.PortalBackendUserNotFoundException;
import ru.russianpost.tracking.portal.exceptions.ServiceUnavailableException;
import ru.russianpost.tracking.portal.exceptions.UserNotAuthorizedException;
import ru.russianpost.tracking.portal.service.backend.PortalBackendService;
import ru.russianpost.tracking.portal.service.statistics.StatisticsService;
import ru.russianpost.tracking.portal.service.statistics.model.StatisticsBatchSettings;
import ru.russianpost.tracking.portal.service.statistics.model.StatisticsSettings;
import ru.russianpost.tracking.portal.utils.UserUtils;

import javax.servlet.http.HttpServletRequest;

import static java.util.Collections.emptyList;

/**
 * @author Amosov Maxim
 * @since 01.04.2021 : 15:47
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1.0/statistics")
public class StatisticsController extends BaseController {
    private final StatisticsService statisticsService;
    private final PortalBackendService portalBackendService;

    /**
     * @param request instance of {@link HttpServletRequest}
     * @return instance of {@link StatisticsDto}
     * @throws PortalBackendUserNotFoundException portal backend user not found
     * @throws ServiceUnavailableException        portal backend is unavailable
     * @throws UserNotAuthorizedException         user not authorized
     */
    @GetMapping
    public StatisticsDto statistics(final HttpServletRequest request) {
        final Person2 person = UserUtils.getPerson(request);
        final boolean unlimited = portalBackendService.getUser(person.getPersonHid()).isUnlimited();
        return StatisticsDto.builder()
            .isUnlimited(unlimited)
            .userEmail(person.getEmail())
            .data(statisticsService.loadStatistics(person.getPersonHid()))
            .settings(statisticsService.loadStatisticsSettings(person.getPersonHid()))
            .dataBatch(unlimited ? statisticsService.loadStatisticsBatch(person.getPersonHid()) : emptyList())
            .batchSettings(unlimited ? statisticsService.loadStatisticsBatchSettings(person.getPersonHid()) : null)
            .build();
    }

    /**
     * Save statistics settings
     *
     * @param request          instance of {@link HttpServletRequest}
     * @param sendStatistics   flag send statistics or not
     * @param notifyEvery      notification interval in days
     * @param notifyOverLimits notify if over-limits occur
     * @throws PortalBackendUserNotFoundException portal backend user not found
     * @throws ServiceUnavailableException        portal backend is unavailable
     * @throws UserNotAuthorizedException         user not authorized
     */
    @PostMapping("saveSettings")
    public void saveSettings(
        final HttpServletRequest request,
        final boolean sendStatistics,
        final Integer notifyEvery,
        final boolean notifyOverLimits
    ) {
        final Person2 person = UserUtils.getPerson(request);
        final StatisticsSettings settings = new StatisticsSettings(sendStatistics, notifyEvery, notifyOverLimits);
        statisticsService.saveStatisticsSettings(person.getPersonHid(), settings);
    }

    /**
     * Save statistics settings batch
     *
     * @param request        instance of {@link HttpServletRequest}
     * @param sendStatistics flag send statistics or not
     * @param notifyEvery    notification interval in days
     * @throws PortalBackendUserNotFoundException portal backend user not found
     * @throws ServiceUnavailableException        portal backend is unavailable
     * @throws UserNotAuthorizedException         user not authorized
     */
    @PostMapping("saveSettingsBatch")
    public void saveSettingsBatch(
        final HttpServletRequest request,
        final boolean sendStatistics,
        final Integer notifyEvery
    ) {
        final Person2 person = UserUtils.getPerson(request);
        final StatisticsBatchSettings settings = new StatisticsBatchSettings(sendStatistics, notifyEvery);
        statisticsService.saveStatisticsBatchSettings(person.getPersonHid(), settings);
    }
}
