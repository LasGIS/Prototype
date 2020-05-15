/*
 * Copyright (c) 2020. Prototype
 */

import './table-page.scss';
import React from 'react';
import { connect } from 'react-redux';
import { redirect, replaceUrl } from '../common/actions.js';
import PropTypes from 'prop-types';
import * as queryString from 'query-string';
import {
  getAutocompleteDataSource,
  getUsers,
  resetAutocompleteDataSource,
  resetUsersPageUrl,
  saveUsersPageUrl,
} from '../common/actions';
import UserManagementTable from './UserManagementTable';
import {
  QUERY_STRING_LIBRARY_SETTINGS_FOR_WORK_WITH_URL,
  RECORDS_ON_PAGE,
  userShape,
} from '../../../constants/constants';
import { globalUserSelector } from '../../../common/services/selectors';

class UserManagementTablePage extends React.Component {
  constructor(props) {
    super(props);

    this.pageBasicUrl = '/user-management-table';
    this.pageSize = RECORDS_ON_PAGE;

    this.getRequestParamsFromLocation = this.getRequestParamsFromLocation.bind(this);
    this.urlSerialize = this.urlSerialize.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.prepareSetUrl = this.prepareSetUrl.bind(this);

    this.handleAutocompleteSelectChange = this.handleAutocompleteSelectChange.bind(this);
  }

  componentDidMount() {
    const { getUsers, getAutocompleteDataSource } = this.props;
    const requestParams = this.getRequestParamsFromLocation();

    getUsers(requestParams);
    getAutocompleteDataSource();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { usersPageUrl, getUsers } = this.props;

    if (prevProps.usersPageUrl !== usersPageUrl) {
      const requestParams = this.getRequestParamsFromLocation();
      getUsers(requestParams);
    }
  }

  componentWillUnmount() {
    const { resetUsersPageUrl, resetAutocompleteDataSource } = this.props;

    resetUsersPageUrl();
    resetAutocompleteDataSource();
  }

  handlePaginationChange({ selected }) {
    this.prepareSetUrl(selected);
  }

  prepareSetUrl(page) {
    const { location, saveUsersPageUrl, replaceUrl } = this.props;
    const params = queryString.parse(
      location.search.replace(/"/g, ''),
      QUERY_STRING_LIBRARY_SETTINGS_FOR_WORK_WITH_URL.INDEX,
    );
    const pageCurrent = !page ? 0 : page || params.page;
    const urlCreated = this.urlSerialize(pageCurrent);

    saveUsersPageUrl(urlCreated);

    if (urlCreated !== `${this.pageBasicUrl}${location.search}`) {
      replaceUrl(urlCreated);
    }
  }

  urlSerialize(page) {
    const urlParams = { page };
    return (
      `${this.pageBasicUrl}?` + queryString.stringify(urlParams, QUERY_STRING_LIBRARY_SETTINGS_FOR_WORK_WITH_URL.INDEX)
    );
  }

  getRequestParamsFromLocation(filterParam = '', filterValue = '') {
    const params = queryString.parse(
      this.props.location.search.replace(/"/g, ''),
      QUERY_STRING_LIBRARY_SETTINGS_FOR_WORK_WITH_URL.INDEX,
    );
    const page = Number(params.page) || 0;
    const result = {
      page,
      size: this.pageSize,
    };

    if (filterParam && filterValue) result[filterParam] = filterValue;

    return result;
  }

  handleAutocompleteSelectChange(value) {
    const { getUsers, usersAutocompleteData } = this.props;
    let filterParam = '',
      filterValue = '';

    if (value) {
      try {
        const data = usersAutocompleteData.itemsMap[value];
        filterParam = data.type;
        filterValue = data.id || value;
      } catch (e) {
        console.error(e);
      }
    }

    const requestParams = this.getRequestParamsFromLocation(filterParam, filterValue);
    getUsers(requestParams);
  }

  render() {
    const { currentUser, users, redirect, usersPagination, usersAutocompleteData } = this.props;
    return (
      <div className={'user-management-table-page'}>
          <UserManagementTable
            id="user-management-table"
            currentUser={currentUser}
            users={users}
            className="user-management-table"
            onEditUser={id => redirect(`/user-management-form/${id}`)}
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

UserManagementTablePage.propTypes = {
  currentUser: userShape,
  users: PropTypes.arrayOf(userShape),
  usersPagination: PropTypes.shape({
    pageCurrent: PropTypes.number,
    pagesCount: PropTypes.number,
  }),
  usersPageUrl: PropTypes.string,
  usersAutocompleteData: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.string),
    itemsMap: PropTypes.object,
  }),

  getUsers: PropTypes.func,
  redirect: PropTypes.func,
  replaceUrl: PropTypes.func,
  saveUsersPageUrl: PropTypes.func,
  resetUsersPageUrl: PropTypes.func,
  getAutocompleteDataSource: PropTypes.func,
  resetAutocompleteDataSource: PropTypes.func,
};

export default connect(
  state => {
    const { users, usersPagination, usersPageUrl, usersAutocompleteData } = state.userManagement;
    return {
      currentUser: globalUserSelector(state),
      users,
      usersPagination,
      usersPageUrl,
      usersAutocompleteData,
    };
  },
  {
    getUsers,
    redirect,
    replaceUrl,
    saveUsersPageUrl,
    resetUsersPageUrl,
    getAutocompleteDataSource,
    resetAutocompleteDataSource,
  },
)(UserManagementTablePage);
