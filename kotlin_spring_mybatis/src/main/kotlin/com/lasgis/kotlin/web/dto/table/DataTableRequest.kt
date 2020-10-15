/*
 * Copyright (c) 2020. Prototype
 */

package com.lasgis.kotlin.web.dto.table

open class EmptyCriteria()

/**
 * Запрос на получение данных от UI на backend.
 * @param start     номер первой записи на этой странице (начиная с 0)
 * @param perPages  сколько строк размещается на странице
 * @param page      номер текущей страницы (начиная с 0)
 * @param pages     количество страниц
 * @param columns   описание колонок для
 * @param orders    порядок сортировки колонок
 * @param criteria: дополнительные критерии поиска
 *
 * @author VLaskin
 * @since 10.06.2020
 */
open class DataTableRequest<Criteria>(
    val start: Int = 0,
    val perPages: Int = 20,
    val page: Int = 0,
    val pages: Int = 0,
    val columns: List<DataTableColumn>? = null,
    val orders: List<DataTableOrder>? = null,
    val criteria: Criteria? = null
) {
    override fun toString(): String {
        return "DataTableRequest(start=$start, perPages=$perPages, page=$page, pages=$pages, columns=$columns, order=$orders, criteria=$criteria)"
    }
}