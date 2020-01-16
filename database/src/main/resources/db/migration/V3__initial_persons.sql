--==============================================================
-- Table: pr_person
--==============================================================
CREATE TABLE pr_person (
  prprs_person_id   SERIAL NOT NULL,
  prprs_mother_id   INTEGER REFERENCES pr_person (prprs_person_id) ON UPDATE RESTRICT ON DELETE CASCADE,
  prprs_father_id   INTEGER REFERENCES pr_person (prprs_person_id) ON UPDATE RESTRICT ON DELETE CASCADE,
  prprs_first_name  TEXT   NOT NULL,
  prprs_last_name   TEXT   NOT NULL,
  prprs_middle_name TEXT,
  prprs_sex TEXT NOT NULL CHECK (prprs_sex IN (
    'MALE',  -- мужчина
    'FEMALE' -- женщина
  )),
  CONSTRAINT pr_person_pk PRIMARY KEY (prprs_person_id)
);
COMMENT ON TABLE pr_person IS 'Таблица персон';
COMMENT ON COLUMN pr_person.prprs_person_id IS 'Уникальный номер персоны';
COMMENT ON COLUMN pr_person.prprs_mother_id IS 'Мать';
COMMENT ON COLUMN pr_person.prprs_father_id IS 'Отец';
COMMENT ON COLUMN pr_person.prprs_first_name IS 'Имя';
COMMENT ON COLUMN pr_person.prprs_last_name IS 'Фамилия';
COMMENT ON COLUMN pr_person.prprs_middle_name IS 'Отчество';

--==============================================================
-- Table: pr_person_relation
--==============================================================
CREATE TABLE pr_person_relation (
  prprl_person_relation_id SERIAL,
  prprs_person_id          INTEGER     NOT NULL REFERENCES pr_person (prprs_person_id) ON UPDATE RESTRICT ON DELETE CASCADE,
  prprl_person_to_id       INTEGER     NOT NULL REFERENCES pr_person (prprs_person_id) ON UPDATE RESTRICT ON DELETE CASCADE,
  prprl_type               TEXT UNIQUE NOT NULL CHECK (prprl_type IN (
    'SPOUSE',          -- супруг (муж или жена)
    'SIBLING',         -- родной брат или сестра (если отец или мать неизвестны)
    'RELATIVE',        -- родственник, родственница
    'COLLEAGUE'        -- коллега
  )),
  CONSTRAINT pr_person_role_pk PRIMARY KEY (prprl_person_relation_id),
  CONSTRAINT pr_person_role_unique UNIQUE (prprs_person_id, prprl_person_to_id, prprl_type)
);
COMMENT ON TABLE pr_person_relation IS 'Таблица связи. Связывает одну персону с другими персонами';
COMMENT ON COLUMN pr_person_relation.prprl_person_relation_id IS 'Уникальный номер связи';
COMMENT ON COLUMN pr_person_relation.prprs_person_id          IS 'Id основной персоны';
COMMENT ON COLUMN pr_person_relation.prprl_person_to_id       IS 'Id связанной персоны';
COMMENT ON COLUMN pr_person_relation.prprl_type               IS 'тип связи';
