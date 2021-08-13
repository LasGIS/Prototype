/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.statistics;

import ru.russianpost.tracking.portal.exceptions.PortalBackendUserNotFoundException;
import ru.russianpost.tracking.portal.exceptions.ServiceUnavailableException;
import ru.russianpost.tracking.portal.service.statistics.model.StatisticsBatchSettings;
import ru.russianpost.tracking.portal.service.statistics.model.StatisticsSettings;
import ru.russianpost.tracking.web.model.portal.statistics.ProfileStatisticFc;
import ru.russianpost.tracking.web.model.portal.statistics.ProfileStatisticRtm34;

import java.util.List;

/**
 * @author Amosov Maxim
 * @since 01.04.2021 : 15:47
 */
public interface StatisticsService {
    /**
     * Retrieves statistics of user with specified hid as JSON
     *
     * @param hid user hid
     * @return statistics
     * @throws PortalBackendUserNotFoundException portal backend user does not exist
     * @throws ServiceUnavailableException        statistics provider is unavailable
     */
    List<ProfileStatisticRtm34> loadStatistics(String hid) throws PortalBackendUserNotFoundException, ServiceUnavailableException;

    /**
     * Retrieves notification settings of user with specified hid
     *
     * @param hid user hid
     * @return notification settings
     * @throws PortalBackendUserNotFoundException portal backend user does not exist
     * @throws ServiceUnavailableException        statistics provider is unavailable
     */
    StatisticsSettings loadStatisticsSettings(String hid) throws PortalBackendUserNotFoundException, ServiceUnavailableException;

    /**
     * Saves notification statistics of user with specified hid
     *
     * @param hid      user hid
     * @param settings settings DTO
     * @throws PortalBackendUserNotFoundException portal backend user does not exist
     * @throws ServiceUnavailableException        statistics provider is unavailable
     */
    void saveStatisticsSettings(String hid, StatisticsSettings settings) throws PortalBackendUserNotFoundException, ServiceUnavailableException;

    /**
     * Retrieves statistics of user with specified hid as JSON
     *
     * @param hid user hid
     * @return batch statistics
     * @throws PortalBackendUserNotFoundException portal backend user does not exist
     * @throws ServiceUnavailableException        statistics provider is unavailable
     */
    List<ProfileStatisticFc> loadStatisticsBatch(String hid) throws PortalBackendUserNotFoundException, ServiceUnavailableException;

    /**
     * Retrieves batch statistics notification settings of user with specified hid
     *
     * @param hid user hid
     * @return batch notification settings
     * @throws PortalBackendUserNotFoundException portal backend user does not exist
     * @throws ServiceUnavailableException        statistics provider is unavailable
     */
    StatisticsBatchSettings loadStatisticsBatchSettings(String hid) throws PortalBackendUserNotFoundException, ServiceUnavailableException;

    /**
     * Saves notification batch settings of user with specified hid
     *
     * @param hid      user hid
     * @param settings settings DTO for saving
     * @throws PortalBackendUserNotFoundException portal backend user does not exist
     * @throws ServiceUnavailableException        statistics provider is unavailable
     */
    void saveStatisticsBatchSettings(String hid, StatisticsBatchSettings settings)
        throws PortalBackendUserNotFoundException, ServiceUnavailableException;
}
