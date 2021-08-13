/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * @author Amosov Maxim
 * @since 31.03.2021 : 18:40
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PortalBackendCompany {
    private String legalId;
    private String name;
    private String inn;
    private String contractNumber;
    private Long contractDate;
    private String ufps;
}
