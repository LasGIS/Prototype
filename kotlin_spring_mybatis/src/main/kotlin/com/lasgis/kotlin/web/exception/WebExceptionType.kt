/*
 * Copyright (c) 2020. Prototype
 */

package com.lasgis.kotlin.web.exception

import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR

/**
 * <description>
 *
 * @author VLaskin
 * @since <pre>22.01.2020</pre>
 */
enum class WebExceptionType(
    val code: Int = 0,
    val message: String,
    val httpStatus: HttpStatus = INTERNAL_SERVER_ERROR
) {
    /** Пользователь не найден */
    USER_NOT_FOUND(101, "Пользователь не найден", HttpStatus.NOT_FOUND)
}