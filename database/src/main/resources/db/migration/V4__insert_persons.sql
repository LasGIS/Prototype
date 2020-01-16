INSERT INTO pr_person (prprs_person_id, prprs_first_name, prprs_last_name, prprs_middle_name, prprs_sex)
VALUES (1, 'Влади́мир', 'Влади́мирович', 'Маяко́вский', 'MALE');
INSERT INTO pr_person (prprs_person_id, prprs_first_name, prprs_last_name, prprs_middle_name, prprs_sex)
VALUES (2, 'Владимир', 'Константинович', 'Маяко́вский', 'MALE');
INSERT INTO pr_person (prprs_person_id, prprs_first_name, prprs_last_name, prprs_middle_name, prprs_sex)
VALUES (3, 'Александра Алексеевна', 'Константинович', 'Павленко', 'FEMALE');

UPDATE pr_person SET
  prprs_father_id = 2,
  prprs_mother_id = 3
 WHERE prprs_person_id = 1;
