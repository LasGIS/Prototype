/*
 * Copyright 2019 Russian Post
 *
 * This source code is Russian Post Confidential Proprietary.
 * This software is protected by copyright. All rights and titles are reserved.
 * You shall not use, copy, distribute, modify, decompile, disassemble or reverse engineer the software.
 * Otherwise this violation would be treated by law and would be subject to legal prosecution.
 * Legal use of the software provides receipt of a license from the right holder only.
 */

import './style.scss';

import React, { Component } from 'react';
import Menu from './Menu';
import { connect } from 'react-redux';
import MainContainer from '../MainPage/MainContainer';
import MainMenuHeader from './MainMenuHeader';
import { clearAllStates } from '../../common/actions';
import ReactModal from 'react-modal';
import MainMenuModal from './MainMenuModal';
import { FEATURE_EDIT_ROLES, isGrantedRoles } from '../../constants/users-roles';
import {
  globalRouterLocationSelector,
  globalUserRolesSelector,
  globalUserFirstUkdByAlphabetIdSelector,
} from '../../common/services/selectors';
import withRedirectProp from '../../hoc/withRedirectProp';
import {ROUTES} from "./constants";

export class MainMenu extends Component {
  constructor(props) {
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
    const noOneMenu = !canSeeUserManagement && !canSeePersonManagement;
    return (
      <div className="main-menu-container">
        <MainMenuHeader />
        <MainContainer className="main-menu">
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

          {noOneMenu && (
            <div className="main-menu__no-one-menu-label">У вас нет прав на выполнение каких-либо действий</div>
          )}
        </MainContainer>
        <ReactModal
          id={'auth-error-message'}
          className="modal-form modal-form_auth-error-modal"
          isOpen={modalIsOpen}
          overlayClassName="modal-form__overlay"
          ariaHideApp={false}
          onRequestClose={this.closeModal}
        >
          <MainMenuModal text={authErrorMsg} closeModal={this.closeModal} />
        </ReactModal>
      </div>
    );
  }
}

export default connect(
  state => ({
    location: globalRouterLocationSelector(state),
    userRoles: globalUserRolesSelector(state),
    firstUserActiveUkdId: globalUserFirstUkdByAlphabetIdSelector(state),
  }),
  {
    clearAllStates,
  },
)(withRedirectProp(MainMenu));
