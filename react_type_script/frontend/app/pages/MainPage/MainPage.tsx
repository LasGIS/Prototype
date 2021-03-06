/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import MainMenu from '../MainMenu/MainMenu';
import ProtectedRoute from '../../components/protected-route/ProtectedRoute';
import { FEATURE_EDIT_ROLES } from '../../constants/users-roles';
import Footer from '../Footer/Footer';
import { withCommonDataRequest } from '../../hoc/withCommonDataRequest';
import { ROUTES } from '../MainMenu/constants';
import MainMenuHeader from '../MainMenu/MainMenuHeader';
import withRedirectProp from '../../hoc/withRedirectProp';
import { ColorStyle } from '../../common/global/global-redux-types';
import { WithRedirectHocProps } from '../../common/types/hocs-injected-prop-types';

const MainMenuPage = React.lazy(() => import('../MainMenu/MainMenuPage'));
const Components = React.lazy(() => import('../../components/ui-kit/Components'));
const UserManagementTablePage = React.lazy(() => import('../UserManagement/table/UserManagementTablePage'));
const RechartsDiagram = React.lazy(() => import('../Diagram/RechartsDiagram'));

type Props = {
  location: Location;
  className?: string;
} & WithRedirectHocProps;

export class MainPage extends Component<Props> {

  constructor(props: Props) {
    super(props);
    this.state = {
      isAuth: false,
    };
  }

  static pathName2topic = (pathname: string) => {
    for (const key in ROUTES) {
      const { url, topic } = ROUTES[key];
      if (url === pathname) {
        return topic;
      }
    }
    return 'topic не найден';
  };

  render() {
    const { pathname } = this.props.location;
    const topic = MainPage.pathName2topic(pathname);
    return (
      <div className={styles.app}>
        <div className={styles.proto}>
          <MainMenuHeader topic={topic}/>
          <div className={styles.commonPane}>
            <div className={styles.leftPane}>
              <MainMenu/>
            </div>
            <Suspense fallback={<div>Загрузка...</div>}>
              <div className={styles.mainPane}>
                <Switch>
                  <ProtectedRoute
                    colorStyle={ColorStyle.white}
                    path={ROUTES.userListPage.url}
                    component={UserManagementTablePage}
                    availableRoles={FEATURE_EDIT_ROLES.USER_MANAGEMENT}
                  />
                  <ProtectedRoute
                    colorStyle={ColorStyle.red}
                    exact
                    path={ROUTES.personListPage.url}
                    component={Components}
                    availableRoles={FEATURE_EDIT_ROLES.PERSON_MANAGEMENT}
                  />
                  <Route
                    path={ROUTES.recharts.url}
                    component={RechartsDiagram}
                  />
                  <Route
                    path={ROUTES.components.url}
                    component={Components}
                  />
                  <Route
                    path={ROUTES.mainMenu.url}
                    component={MainMenuPage}
                  />
                  <Redirect from="/" to={ROUTES.mainMenu.url}/>
                </Switch>
              </div>
            </Suspense>
            <div className={styles.rightPane}>
              {/*<p>правая панель</p>*/}
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default withRedirectProp(withCommonDataRequest(MainPage));
