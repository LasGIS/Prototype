/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React, { Component } from 'react';
import Menu from './Menu';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import MainMenuModal from '../MainMenuModal/MainMenuModal';
import { globalRouterLocationSelector, globalUserRolesSelector } from '../../common/services/selectors';
import withRedirectProp from '../../hoc/withRedirectProp';
import { ROUTES } from './constants';
import { FEATURE_EDIT_ROLES, isGrantedRoles } from '../../constants/users-roles';
import { APP_ROOT_SELECTOR } from '../../constants/constants';
import { clearAllStates } from '../Global/services/action-creators';
import { WithRedirectHocProps } from '../../common/types/hocs-injected-prop-types';
import { UserRoleEnum } from '../../common/types/server-api-dtos';
import { LocationDescriptorObject } from 'history';
import cn from 'classnames';

type Props = {
  location: LocationDescriptorObject<{
    roleNoAccessRedirect: boolean;
    error?: string
  }>;
  clearAllStates: () => void;
  className?: string;
  userRoles: UserRoleEnum[];
} & WithRedirectHocProps;

type State = {
  modalIsOpen: boolean;
};

export class MainMenu extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { modalIsOpen: false };
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  componentDidMount() {
    const { location, clearAllStates } = this.props;

    if (location && location.state && location.state.roleNoAccessRedirect) {
      ReactModal.setAppElement(APP_ROOT_SELECTOR);
      this.setState({ modalIsOpen: true });
    } else {
      clearAllStates();
    }
  }

  render() {
    const { redirect, location, userRoles } = this.props;
    const authErrorMsg = location && location.state && location.state.roleNoAccessRedirect ? location.state.error : '';
    const { modalIsOpen } = this.state;
    const canSeeUserManagement = isGrantedRoles(userRoles, FEATURE_EDIT_ROLES.USER_MANAGEMENT);
    const canSeePersonManagement = isGrantedRoles(userRoles, FEATURE_EDIT_ROLES.PERSON_MANAGEMENT);
    return (
      <div className={styles.mainMenuContainer}>
        {canSeeUserManagement && (
          <Menu
            id="canSeeUserManagementList"
            name="Первое меню (User Management)"
            onClick={() => redirect(`/${ROUTES.userListPage}`)}
          />
        )}
        {canSeePersonManagement && (
          <Menu
            id="canSeePersonManagementList"
            name="Второе меню (Person Management)"
            onClick={() => redirect(`/${ROUTES.personListPage}`)}
          />
        )}
        <Menu
          id="routesComponents"
          name="ReCharts диаграмма"
          onClick={() => redirect(`/${ROUTES.recharts}`)}
        />
        <Menu
          id="routesComponents"
          name="ROUTES.components"
          onClick={() => redirect(`/${ROUTES.components}`)}
        />
        <ReactModal
          id='auth-error-message'
          className={cn(styles.modalForm, styles.authErrorModal)}
          isOpen={modalIsOpen}
          overlayClassName={styles.overlay}
          ariaHideApp={false}
          onRequestClose={this.closeModal}
        >
          <MainMenuModal id='auth-error-message-main-menu' text={authErrorMsg} closeModal={this.closeModal}/>
        </ReactModal>
      </div>
    );
  }
}

export default connect(
  state => ({
    location: globalRouterLocationSelector(state),
    userRoles: globalUserRolesSelector(state),
  }), {
    clearAllStates,
  },
)(withRedirectProp(MainMenu));
