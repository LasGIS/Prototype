/*
 * Copyright (c) 2020. Prototype
 */
package com.lasgis.kotlin.web.dto

/**
 * Express delivery json
 */
data class ErrorDto(
    val code: Int? = null,
    val text: String? = null
)