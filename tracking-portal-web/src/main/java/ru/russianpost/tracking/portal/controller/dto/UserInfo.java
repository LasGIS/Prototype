/*
 * Copyright (c) 2021. Prototype
 */

package ru.russianpost.tracking.portal.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

/**
 * The Class UserDto definition.
 *
 * @author Vladimir Laskin
 * @since 20.05.2021 : 0:43
 */
@Data
@Builder
public class UserInfo {
    private String hid;
    private String name;
    @Getter(onMethod_ = @JsonProperty("isServiceTrackingUser"))
    private boolean isServiceTrackingUser;
    @Getter(onMethod_ = @JsonProperty("isAuthorized"))
    private boolean isAuthorized;
}
