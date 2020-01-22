/*
 * Copyright (c) 2020. Prototype
 */

package com.lasgis.kotlin.web.rest

import com.lasgis.kotlin.web.dao.User
import com.lasgis.kotlin.web.dao.UserRole
import com.lasgis.kotlin.web.exception.WebException
import com.lasgis.kotlin.web.exception.WebExceptionType
import com.lasgis.kotlin.web.mybatis.mapper.UserMapper
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

/**
 * <description>
 *
 * @author VLaskin
 * @since <pre>04.01.2020</pre>
 */
@RestController
class AuthController(private val userMapper: UserMapper) {

    @PostMapping("/login")
    fun login(
        @RequestParam("j_username") login: String,
        @RequestParam("j_password") password: String
    ): User {
        val user = userMapper.findByLogin(login)
        user?.let { return it }
        throw WebException(WebExceptionType.USER_NOT_FOUND)
    }
}