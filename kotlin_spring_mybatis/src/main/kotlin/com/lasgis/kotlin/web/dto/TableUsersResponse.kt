/*
 * Copyright (c) 2020. Prototype
 */

package com.lasgis.kotlin.web.dto

import com.lasgis.kotlin.web.dto.table.DataTableRequest
import com.lasgis.kotlin.web.dto.table.EmptyCriteria

/**
 * <description>
 *
 * @author VLaskin
 * @since <pre>26.05.2020</pre>
 */
data class TableUsersResponse(
    var content: List<User>,
    var request: DataTableRequest<EmptyCriteria>
)