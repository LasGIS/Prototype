/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.statistics.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author Amosov Maxim
 * @since 01.04.2021 : 15:51
 */
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class StatisticsSettings {
    /**
     * Send statistics or not
     */
    private Boolean sendStatistics;
    /**
     * Notification interval in days
     */
    private Integer notifyEvery;
    /**
     * Notify if over-limits occur
     */
    private Boolean notifyOverLimits;
}
