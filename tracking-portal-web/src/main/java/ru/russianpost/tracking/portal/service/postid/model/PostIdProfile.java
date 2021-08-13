/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.postid.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ru.russianpost.pochtaid.sso.vo2.LegalPerson2;
import ru.russianpost.pochtaid.sso.vo2.Person2;

import java.util.List;

/**
 * @author Amosov Maxim
 * @since 31.03.2021 : 18:22
 */
@Getter
@ToString
@NoArgsConstructor
public class PostIdProfile {
    private String type;
    private List<Person2> persons;
    private List<LegalPerson2> legalPersons;
}
