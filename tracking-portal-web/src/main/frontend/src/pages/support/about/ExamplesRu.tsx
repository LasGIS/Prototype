/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { Link } from 'react-router-dom';

const ExamplesRu = () => (
  <div className="help-page">
    <div className="help-article">
      <Link to="/support#about">О сервисе</Link>
      <h3> Примеры кода для работы с API</h3>
      <article className="page-help-article__content">
        <p>
          <strong>Единичный доступ</strong>
        </p>
        <p>
          <a href="/documents/10184/19275/ExampleJavaSingle.zip">Пример кода на Java</a>
          <br />
          <a href="/documents/10184/19275/ExamplePHP_Single.zip">Пример кода на PHP</a>
          <br />
          <a href="/documents/10184/19275/ExamplePython_Single.zip">Пример кода на Python</a>
          <br />
          <a href="/documents/10184/19275/Example_1C.zip">Пример кода для 1С</a>
        </p>
        &nbsp;
        <p>
          <strong>Пакетный доступ</strong>
        </p>
        <p>
          <a href="/documents/10184/19275/ExampleJavaPackage.zip">Пример кода на Java</a>
          <br />
          <a href="/documents/10184/19275/ExamplePHP_Package.zip">Пример кода на PHP</a>
          <br />
          <a href="/documents/10184/19275/ExamplePython_Package.zip">Пример кода на Python</a>
          <br />
          <a href="/documents/10184/19275/Example_1C.zip">Пример кода для 1С</a>
        </p>
      </article>
    </div>
  </div>
);

export default ExamplesRu;
