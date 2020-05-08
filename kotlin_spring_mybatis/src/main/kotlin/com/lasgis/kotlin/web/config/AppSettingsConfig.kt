/*
 * Copyright (c) 2020. Prototype
 */
package com.lasgis.kotlin.web.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

/**
 * Внутренние настройки
 *
 * @since <pre>25.09.18</pre>
 */
@Component
@ConfigurationProperties("app")
data class AppSettingsConfig (
    var printLocale: Boolean? = false,
    var name: String? = "",
    var version: String? = "неизвестно"
)
