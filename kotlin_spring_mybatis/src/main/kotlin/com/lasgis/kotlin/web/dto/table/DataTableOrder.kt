/*
 * Copyright (c) 2020. Prototype
 */
package com.lasgis.kotlin.web.dto.table

/**
 * The Class DataTableOrder.
 * @param dbId  уникальный идентификатор поля (имя в DB)
 * @param dir   направление сортировки
 *
 * @author Vladimir Laskin
 * @version 1.0
 */
data class DataTableOrder (
    var dbId: String,
    var dir: DirType
) {
    constructor() : this("", DirType.ASC)
    override fun toString(): String {
        return "DataTableOrder(column=$dbId, dir=$dir)"
    }
}