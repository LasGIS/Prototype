/*
 * Copyright (c) 2020. Prototype
 */

package com.lasgis.kotlin.web.rest

import com.lasgis.kotlin.web.dto.User
import com.lasgis.kotlin.web.exception.WebException
import com.lasgis.kotlin.web.exception.WebExceptionType
import com.lasgis.kotlin.web.mybatis.mapper.UserMapper
import org.springframework.beans.factory.annotation.Autowired
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
class AuthController {

    @Autowired
    private lateinit var userMapper: UserMapper

    @PostMapping("/login")
    fun login(
        @RequestParam("j_username") login: String,
        @RequestParam("j_password") password: String
    ): User {
        return userMapper.findByLogin(login)
            ?: throw WebException(WebExceptionType.USER_NOT_FOUND)
    }
}