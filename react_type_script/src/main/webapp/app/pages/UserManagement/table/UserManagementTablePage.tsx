/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as queryString from 'query-string';
import { resetUsersPageUrl, saveUsersPageUrl } from '../services/action-creators';
import { getUsers } from '../services/async-actions';
import UserManagementTable from './UserManagementTable';
import { RootStoreData } from '../../../common/types/redux-types';
import { WithRedirectHocProps, WithReplaceUrlHocProps } from '../../../common/types/hocs-injected-prop-types';
import { globalRouterLocationSelector } from '../../../common/services/selectors';
import { RequestParams } from '../../../common/types/server-api-dtos';

type Props = PropsFromRedux & WithRedirectHocProps & WithReplaceUrlHocProps;

class UserManagementTablePage extends React.Component<Props> {
  pageBasicUrl: string;
  pageSize: number;

  constructor(props: Props) {
    super(props);

    this.pageBasicUrl = '/user-management-table';
    this.pageSize = 20;

    this.getRequestParamsFromLocation = this.getRequestParamsFromLocation.bind(this);
    this.urlSerialize = this.urlSerialize.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.prepareSetUrl = this.prepareSetUrl.bind(this);
  }

  componentDidMount() {
    const { getUsers } = this.props;
    const requestParams = this.getRequestParamsFromLocation();

    getUsers(requestParams);
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<any>) {
    const { usersPageUrl, getUsers } = this.props;

    if (prevProps.usersPageUrl !== usersPageUrl) {
      const requestParams = this.getRequestParamsFromLocation();
      getUsers(requestParams);
    }
  }

  componentWillUnmount() {
    const { resetUsersPageUrl } = this.props;

    resetUsersPageUrl();
  }

  handlePaginationChange({ selected }: { selected: number }) {
    this.prepareSetUrl(selected);
  }

  prepareSetUrl(page: number) {
    const { location, saveUsersPageUrl, replaceUrl } = this.props;
    const params = queryString.parse(
      location.search.replace(/"/g, ''),
      { arrayFormat: 'index' },
    );
    const pageCurrent:number = !page ? 0 : page || Number(params.page);
    const urlCreated = this.urlSerialize(pageCurrent);

    saveUsersPageUrl(urlCreated);

    if (urlCreated !== `${this.pageBasicUrl}${location.search}`) {
      replaceUrl(urlCreated);
    }
  }

  urlSerialize(page: number): string {
    const urlParams = { page };
    return (
      `${this.pageBasicUrl}?` + queryString.stringify(urlParams, { arrayFormat: 'index' })
    );
  }

  getRequestParamsFromLocation(filterParam = '', filterValue = ''): RequestParams {
    const params = queryString.parse(
      this.props.location.search.replace(/"/g, ''),
      { arrayFormat: 'index' },
    );
    const page = Number(params.page) || 0;
    const result = {
      page,
      size: this.pageSize,
    };

//    if (filterParam && filterValue) result[filterParam] = filterValue;

    return result;
  }

  render() {
    const { currentUser, users, redirect, usersPagination } = this.props;
    return (
      <div className={styles.tablePage}>
        <UserManagementTable
          id="user-management-table"
          currentUser={currentUser}
          users={users}
          onEditUser={(id: number) => redirect(`/user-management-form/${id}`)}
          addUser={() => redirect(`/user-management-form`)}
        />
        {/*
          {users && users.length > 0 && (
            <Pagination
              id={'userManagementPagination'}
              pageTotalCount={usersPagination.pagesCount}
              pageCurrent={usersPagination.pageCurrent}
              onPageChange={this.handlePaginationChange}
            />
          )}
*/}
      </div>
    );
  }
}

const mapState = (state: RootStoreData) => {
  const { users, usersPagination, usersPageUrl } = state.userManagement;
  return {
    location: globalRouterLocationSelector(state),
//    currentUser: globalUserSelector(state),
    currentUser: state.global.user,
    users,
    usersPagination,
    usersPageUrl,
  };

};
const mapDispatch = {
  getUsers,
  saveUsersPageUrl,
  resetUsersPageUrl,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(UserManagementTablePage);
