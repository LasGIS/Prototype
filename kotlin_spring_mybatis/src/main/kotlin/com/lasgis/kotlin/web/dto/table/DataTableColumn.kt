/*
 * Copyright (c) 2020. Prototype
 */
package com.lasgis.kotlin.web.dto.table

/**
 * The Class DataTableColumn.
 * @param dbId         уникальный идентификатор поля (имя в DB)
 * @param name         название поля
 * @param orderAble    участвует поле в сортировке
 * @param searchable   участвует поле в поиске
 * @param search       значение для поиска
 *
 * @author Vladimir Laskin
 * @version 1.0
 */
data class DataTableColumn(
    var dbId: String,
    var name: String,
    var orderAble: Boolean = false,
    var searchable: Boolean = false,
    var search: String? = null
) {
    constructor() : this(
        dbId = "null",
        name = "???",
        orderAble = false,
        searchable = false,
        search = null
    )

    override fun toString(): String {
        return "DataTableColumn(id='$dbId', name='$name', orderAble=$orderAble, searchable=$searchable, search=$search)"
    }
}