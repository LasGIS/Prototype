/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.config.postid;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author Amosov Maxim
 * @since 31.03.2021 : 10:29
 */
@Data
@ConfigurationProperties(prefix = "post-id")
public class PostIdProperties {
    private String clientId;
    private String clientSecret;
    private String baseHomeUrl;
    private String baseUrl;
    private String logoutUrl;
    private String userAccountUrl;
    private String apiUrl;
    private String pingUrl;
}
