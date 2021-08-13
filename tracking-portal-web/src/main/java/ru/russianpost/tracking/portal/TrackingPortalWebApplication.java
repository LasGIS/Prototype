/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

/**
 * Application entry point class
 */
@SpringBootApplication
@ConfigurationPropertiesScan
@SuppressWarnings("checkstyle:HideUtilityClassConstructor")
public class TrackingPortalWebApplication {
    /**
     * The entry point of application
     *
     * @param args input arguments
     */
    public static void main(String[] args) {
        SpringApplication.run(TrackingPortalWebApplication.class, args);
    }
}
