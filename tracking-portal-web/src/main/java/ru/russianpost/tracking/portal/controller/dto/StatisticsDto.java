/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.controller.dto;

import lombok.Builder;
import lombok.Data;
import ru.russianpost.tracking.portal.service.statistics.model.StatisticsBatchSettings;
import ru.russianpost.tracking.portal.service.statistics.model.StatisticsSettings;
import ru.russianpost.tracking.web.model.portal.statistics.ProfileStatisticFc;
import ru.russianpost.tracking.web.model.portal.statistics.ProfileStatisticRtm34;

import java.util.List;

/**
 * @author Amosov Maxim
 * @since 21.05.2021 : 16:29
 */
@Data
@Builder
public class StatisticsDto {
    private String userEmail;
    private boolean isUnlimited;
    private List<ProfileStatisticRtm34> data;
    private StatisticsSettings settings;
    private List<ProfileStatisticFc> dataBatch;
    private StatisticsBatchSettings batchSettings;
}
