/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

/**
 * @author Amosov Maxim
 * @since 30.03.2021 : 17:44
 */
@Getter
@ToString
@NoArgsConstructor
public class PortalBackendUser implements Serializable {
    /**
     * PostId hid
     */
    private String hid;
    /**
     * Portal backend user login
     */
    private String login;
    /**
     * Whether user has unlimited access or not
     */
    private boolean unlimited;
}
