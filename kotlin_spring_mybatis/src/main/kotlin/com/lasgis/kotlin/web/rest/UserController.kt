/*
 * Copyright (c) 2020. Prototype
 */

package com.lasgis.kotlin.web.rest

import com.lasgis.kotlin.web.dto.User
import com.lasgis.kotlin.web.dto.UsersData
import com.lasgis.kotlin.web.exception.WebException
import com.lasgis.kotlin.web.exception.WebExceptionType
import com.lasgis.kotlin.web.mybatis.mapper.UserMapper
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletRequest

/**
 * <description>
 *
 * @author VLaskin
 * @since <pre>26.12.2019</pre>
 */
@RestController
@RequestMapping("/v1.0/user")
class UserController(private val userMapper: UserMapper) {

    /**
     * здесь нужно вынести текущего user`а
     */
    @GetMapping("/current")
    fun user(
        request: HttpServletRequest,
        @RequestParam(value = "login") login: String
    ): User {
        val user = userMapper.findByLogin(login)
        user?.let { return it }
        throw WebException(WebExceptionType.USER_LOGIN_NOT_FOUND, login)
    }

    /**
     * здесь нужно вынести текущего user`а
     */
    @GetMapping
    fun users(
        request: HttpServletRequest,
        @RequestParam(value = "page", defaultValue = "0") page: Int,
        @RequestParam(value = "size", defaultValue = "20") size: Int
    ): UsersData {
        return UsersData(userMapper.findUsers(), page, size)
    }
}