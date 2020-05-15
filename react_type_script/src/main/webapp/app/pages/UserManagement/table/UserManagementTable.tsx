/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React from 'react';
import './table.scss';
import TableRow from '../../../components/table/TableRow';
import TableEmptyRow from '../../../components/table/TableEmptyRow';
import { getRolesString } from './utils';
import { UserDto } from '../../../common/types/server-api-dtos';
import TableHeadCell from '../../../components/table/TableHeadCell';
import TableCell from '../../../components/table/TableCell';

type Props = {
  currentUser: UserDto;
  users: [UserDto];
};

export class UserManagementTable extends React.Component<Props> {
  static defaultProps = {};

  render() {
    const { users } = this.props;

    return (
      <div className={'user-management-table'}>
        {this.renderHeaderRow}
        <div className="user-management-table__rows">
          {users && users.length ? this.renderUsers() : <TableEmptyRow/>}
        </div>
      </div>
    );
  }

  renderHeaderRow() {
    return (
      <TableRow>
        <TableHeadCell className={styles.userId}>ID</TableHeadCell>
        <TableHeadCell className={styles.login}>LOGIN</TableHeadCell>
        <TableHeadCell className={styles.fio}>ФИО</TableHeadCell>
        <TableHeadCell className={styles.roles}>РОЛИ</TableHeadCell>
        <TableHeadCell className={styles.archived}>АКТИВНЫЙ</TableHeadCell>
      </TableRow>
    );
  }

  renderRow(user: UserDto, index: number) {
    const roles = getRolesString(user.roles);
    return (
      <TableRow key={index}>
        <TableCell className={styles.userId}>{user.userId}</TableCell>
        <TableCell className={styles.login}>{user.login}</TableCell>
        <TableCell className={styles.fio}>{user.name}</TableCell>
        <TableCell className={styles.roles}>{roles}</TableCell>
        <TableCell className={styles.archived}>{user.archived}</TableCell>
      </TableRow>
    );
  }

  renderUsers() {
    const { users } = this.props;
    return (
      <>
        {users.map((user, index) => {
          this.renderRow(user, index);
        })}
      </>
    );
  }
}

export default UserManagementTable;

UserManagementTable.defaultProps = {
  users: [],
};
