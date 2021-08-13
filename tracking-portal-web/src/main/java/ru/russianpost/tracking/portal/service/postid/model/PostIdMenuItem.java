/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.postid.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

/**
 * @author Amosov Maxim
 * @since 31.03.2021 : 10:32
 */
@Getter
public class PostIdMenuItem {
    /** MenuItem type E */
    public static final String MENU_TYPE_E = "E";
    /** MenuItem type L */
    public static final String MENU_TYPE_L = "L";

    private final String title;
    private final String url;
    private final String type;

    /**
     * @param title menuItem title
     * @param url   menuItem url
     * @param type  menuItem type
     */
    @JsonCreator
    public PostIdMenuItem(
        @JsonProperty("tl") final String title,
        @JsonProperty("u") final String url,
        @JsonProperty("tp") final String type
    ) {
        this.title = title;
        this.url = url;
        this.type = type;
    }
}
