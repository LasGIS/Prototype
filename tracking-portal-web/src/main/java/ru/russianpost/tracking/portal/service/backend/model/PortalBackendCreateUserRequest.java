/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * @author Amosov Maxim
 * @since 31.03.2021 : 18:59
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PortalBackendCreateUserRequest {
    /**
     * User email
     */
    private String email;
    /**
     * Whether user has unlimited access or not
     */
    private boolean unlimited;
    /**
     * Optional company info
     */
    private PortalBackendCompany company;
}
