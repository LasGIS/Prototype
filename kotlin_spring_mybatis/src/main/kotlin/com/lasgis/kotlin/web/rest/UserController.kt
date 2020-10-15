/*
 * Copyright (c) 2020. Prototype
 */

package com.lasgis.kotlin.web.rest

import com.lasgis.kotlin.web.dto.RequestUsers
import com.lasgis.kotlin.web.dto.TableUsersResponse
import com.lasgis.kotlin.web.dto.User
import com.lasgis.kotlin.web.dto.UsersData
import com.lasgis.kotlin.web.dto.table.DataTableOrder
import com.lasgis.kotlin.web.dto.table.DataTableRequest
import com.lasgis.kotlin.web.dto.table.EmptyCriteria
import com.lasgis.kotlin.web.dto.table.Pagination
import com.lasgis.kotlin.web.exception.WebException
import com.lasgis.kotlin.web.exception.WebExceptionType
import com.lasgis.kotlin.web.mybatis.mapper.UserMapper
import mu.KotlinLogging
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletRequest

private val log = KotlinLogging.logger {}

/**
 * <description>
 *
 * @author VLaskin
 * @since <pre>26.12.2019</pre>
 */
@RestController
@RequestMapping("/v1.0/users")
class UserController(private val userMapper: UserMapper) {

    /**
     * здесь нужно вынести текущего user`а
     */
    @GetMapping("/current")
    fun user(
        request: HttpServletRequest,
        @RequestParam(value = "login") login: String
    ): User {
        return userMapper.findByLogin(login)
            ?: throw WebException(WebExceptionType.USER_LOGIN_NOT_FOUND, login)
    }

    /**
     * здесь нужно вынести всех ползователей
     */
    @GetMapping
    fun users(req: RequestUsers): UsersData {
        log.info("RequestUsers = $req")
        val user: List<User> = userMapper.findAllUsers()
        val pagination: Pagination = req.pagination ?: Pagination(0, 0)
        return UsersData(user, pagination)
//        ? req.pagination : Pagination(1,1)
    }

    /**
     * здесь нужно вынести всех ползователей
     */
    @PostMapping
    fun postUsers(
        @RequestBody(required = true) request: DataTableRequest<EmptyCriteria>
    ): TableUsersResponse {
        log.info("DataTableRequest = $request")
        val orders: List<DataTableOrder>? = request.orders?.map { DataTableOrder(it.dbId, it.dir) }

        val user: List<User> = userMapper.findUsers(null, null, orders)
        return TableUsersResponse(user, request)
    }
}
