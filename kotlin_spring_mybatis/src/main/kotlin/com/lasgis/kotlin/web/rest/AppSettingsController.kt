/*
 * Copyright (c) 2020. Prototype
 */
package com.lasgis.kotlin.web.rest

import com.lasgis.kotlin.web.config.AppSettingsConfig
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

/**
 * REST для получения внутренних настроек приложения
 *
 * @author VLaskin
 * @since <pre>01.04.2019</pre>
 */
@RestController
@RequestMapping("/v1.0")
class AppSettingsController(private val appSettingsConfig: AppSettingsConfig) {

    /**
     * Get current settings
     * @return settings
     */
    @get:RequestMapping(value = ["/settings"], method = [RequestMethod.GET])
    val appSettings: AppSettingsConfig?
        get() = appSettingsConfig
}