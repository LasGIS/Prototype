/*
 * Copyright (c) 2020. Prototype
 */
package com.lasgis.kotlin.web.dto.table

/**
 * The Class DataTableOrder.
 * @author Vladimir Laskin
 * @version 1.0
 */
data class DataTableOrder (
    var column: Int? = 0,
    var dir: String? = "asc"
)