/*
 * Copyright (c) 2020. Prototype
 */

package com.lasgis.kotlin.web.mybatis.mapper

import com.lasgis.kotlin.web.dto.User
import com.lasgis.kotlin.web.dto.table.DataTableOrder
import org.apache.ibatis.annotations.Insert
import org.apache.ibatis.annotations.Mapper
import org.apache.ibatis.annotations.Options
import org.apache.ibatis.annotations.Param
import org.apache.ibatis.annotations.Select

/**
 * <description>
 *
 * @author VLaskin
 * @since <pre>26.12.2019</pre>
 */
@Mapper
interface UserMapper {

    @Insert("""
        INSERT INTO um_user (umusr_name, umusr_login, umusr_password, umusr_archived)
        VALUES(#{name}, #{login}, #{password}, #{archived})
    """)
    @Options(useGeneratedKeys = true, keyProperty = "userId", keyColumn = "umusr_user_id")
    fun insertUser(user: User)

    @Select("""
      SELECT
        umusr_user_id as userId,
        umusr_name as name,
        umusr_login as login,
        umusr_password as password,
        umusr_archived as archived
      FROM um_user
      WHERE umusr_user_id = #{id}
    """)
    fun findById(@Param("id") id: Long): User?

    fun findByLogin(@Param("login") login: String): User?

    fun findAllUsers(): List<User>

    fun findUsers(
        @Param("login") login: String?,
        @Param("name") name: String?,
        @Param("orders") orders: List<DataTableOrder>?
    ): List<User>
}