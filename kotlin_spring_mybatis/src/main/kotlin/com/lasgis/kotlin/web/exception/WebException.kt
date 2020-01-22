/*
 * Copyright 2018 Russian Post
 *
 * This source code is Russian Post Confidential Proprietary.
 * This software is protected by copyright. All rights and titles are reserved.
 * You shall not use, copy, distribute, modify, decompile, disassemble or reverse engineer the software.
 * Otherwise this violation would be treated by law and would be subject to legal prosecution.
 * Legal use of the software provides receipt of a license from the right holder only.
 */
package com.lasgis.kotlin.web.exception

import org.springframework.http.HttpStatus

private fun messageFormat(info: String, vararg addInfo: Any): String {
    try {
        return String.format(info, addInfo)
    } catch (ex: Exception) {
        ex.printStackTrace()
    }
    return info + if (addInfo.isEmpty()) ""
    else addInfo.joinToString(", ", ": ")
}

/**
 * Обобщенное системное прерывание
 *
 * @author Andrey Semochkin
 * @version 1.0
 * @since <pre>10.08.18</pre>
 */
class WebException(
    private val exceptionType: WebExceptionType,
    vararg addInfo: Any?,
    throwable: Throwable? = null
) : RuntimeException(messageFormat(exceptionType.message, addInfo), throwable) {

    /**
     * Constructs a new exception with the specified detail message
     *
     * @param throwable     Throwable
     * @param exceptionType тип ошибоки
     * @param addInfo       дополнительный параметры
     */
    constructor(throwable: Throwable?, exceptionType: WebExceptionType, vararg addInfo: String)
        : this(exceptionType, addInfo, throwable)

    val messageCode: Int
        get() = exceptionType.code

    val httpStatus: HttpStatus
        get() = exceptionType.httpStatus

}