/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

/**
 * @author Amosov Maxim
 * @since 21.05.2021 : 15:36
 */
@Data
@Builder
public class AccessSettingsDto {
    private String userEmail;
    private String backendUserLogin;
    @Getter(onMethod_ = @JsonProperty("isBatchAccessAllowed"))
    private boolean isBatchAccessAllowed;
}
