/*
 * Copyright (c) 2021. Prototype
 */

import React, { ComponentType, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

const scrollToHash = (hash: string) => {
  const id = hash.replace('#', '');
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export function withHashLink<P>(OriginalComponent: ComponentType<RouteComponentProps<P>>) {
  const WithHashLink = (props: RouteComponentProps<P>) => {
    useEffect(() => {
      const { hash } = props.location;
      if (hash !== '') {
        scrollToHash(hash);
      }
    }, [ props.location ]);

    return <OriginalComponent {...props} />;
  }

  return withRouter(WithHashLink);
}
