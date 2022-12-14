/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { Link } from 'react-router-dom';

const ExamplesEn = () => (
  <div className="help-page">
    <div className="help-article">
      <Link to="/support#about">On the service</Link>
      <h3> Sample code to use API service</h3>
      <article className="page-help-article__content">
        <p>
          <strong>Single access</strong>
        </p>
        <p>
          <a href="/documents/10184/19275/ExampleJavaSingle.zip">Example code in Java</a>
          <br />
          <a href="/documents/10184/19275/ExamplePHP_Single.zip">Example code in PHP</a>
          <br />
          <a href="/documents/10184/19275/ExamplePython_Single.zip">Example code in Python</a>
          <br />
          <a href="/documents/10184/19275/Example_1C.zip">Example code in 1С</a>
        </p>
        &nbsp;
        <p>
          <strong>Remote batch access</strong>
        </p>
        <p>
          <a href="/documents/10184/19275/ExampleJavaPackage.zip">Example code in Java</a>
          <br />
          <a href="/documents/10184/19275/ExamplePHP_Package.zip">Example code in PHP</a>
          <br />
          <a href="/documents/10184/19275/ExamplePython_Package.zip">Example code in Python</a>
          <br />
          <a href="/documents/10184/19275/Example_1C.zip">Example code in 1С</a>
        </p>
      </article>
    </div>
  </div>
);

export default ExamplesEn;
