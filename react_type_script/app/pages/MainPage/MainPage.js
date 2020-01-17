
import './style.scss';

import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import MainMenu from '../MainMenu/MainMenu';
import Components from '../../components/ui-kit/Components';
import ComponentsRpo from '../../components/ui-kit/ComponentsRpo';
import ScanRpo from '../RpoRegistration/scan/ScanRpo';
import SelectLetterTicket from '../RpoRegistration/select-letter/SelectLetterTicket';
import RpoDetails from '../RpoRegistration/rpo-details/RpoDetails';
import RpoConfirmation from '../RpoRegistration/confirmation/RpoConfirmation';
import ScanCapacityPage from '../ContainerRegistration/ScanCapacityPage/ScanCapacityPage';
import CompleteCapacityConfirmation from '../ContainerRegistration/ScanCapacityPage/CompleteCapacityConfirmation';
import ContinuesCapacityConfirmation from '../ContainerRegistration/ScanCapacityPage/ContinuesCapacityConfirmation';
import ScanContainerPage from '../ContainerRegistration/ScanContainerPage/ScanContainerPage';
import CapacityRpoViewPage from '../ContainerRegistration/RpoViewPage/CapacityRpoViewPage';
import ContainerListPage from '../../pages/ContainerRegistration/ContainerListPage/ContainerListPage';
import CapacityViewPage from '../ContainerRegistration/CapacityViewPage/CapacityViewPage';
import ContainerViewPage from '../ContainerRegistration/ContainerViewPage/ContainerViewPage';
import { ROUTES as STOCKROOM_ROUTES } from '../Stockroom/constants';
import StockroomTable from '../Stockroom/table/StockroomTablePage';
import EventsRpoTable from '../Stockroom/EventsRpo/EventsRpoTablePage';
import StockroomDetail from '../Stockroom/StockroomDetail/StockroomDetail';
import UserManagementTable from '../UserManagement/table/UserManagementTablePage';
import UserManagementFormPage from '../UserManagement/form/UserManagementFormPage';
import { ROUTES as CAPACITY_FORMING_ROUTES } from '../CapacityForming/constants';
import CapacityCreationPage from '../CapacityForming/CapacityCreationPage/CapacityCreationPage';
import CapacityEditingPage from '../CapacityForming/CapacityEditingPage/CapacityEditingPage';
import CapacityClosingPage from '../CapacityForming/CapacityClosingPage/CapacityClosingPage';
import CapacityUnformingPage from '../CapacityForming/CapacityUnformingPage/CapacityUnformingPage';
import { ROUTES as UKD_PASSPORT_ROUTES } from '../UkdPassport/constants';
import UkdDetailPage from '../UkdPassport/UkdDetailPage/UkdDetailPage';
import InventoryListPage from '../Inventory/InventoryListPage/InventoryListPage';
import InventoryPage from '../Inventory/InventoryPage/InventoryPage';
import InventoryConflictsPage from '../Inventory/InventoryConflictsPage/InventoryConflictsPage';
import InventoryReportPage from '../Inventory/InventoryReportPage/InventoryReportPage';
import ProtectedRoute from '../../components/protected-route/ProtectedRoute';
import { FEATURE_EDIT_ROLES, ROLES } from '../../common/constants/users-roles';
import { withCommonDataRequest } from '../../hoc/withCommonDataRequest';
import RpoViewPage from '../RpoRegistration/rpo-details/RpoViewPage';
import { ROUTES as COURIER_DISPATCH_ROUTES } from '../CourierDispatch/constants';
import CourierDispatchDeliveryListPage from '../CourierDispatch/delivery-list/DeliveryListPage/CourierDispatchDeliveryListPage';
import CourierDispatchDeliveryListCourierPage from '../CourierDispatch/delivery-list/DeliveryListCourierPage/CourierDispatchDeliveryListCourierPage';
import CourierDispatchScanRposPage from '../CourierDispatch/scan-rpos/ScanRposPage/ScanRposPage';
import CourierDispatchApproveDeliveryListPage from '../CourierDispatch/approve/ApproveDeliveryListPage/ApproveDeliveryListPage';
import { ROUTES as COURIER_RECEPTION_ROUTES } from '../CourierReception/constants';
import RouteListsPage from '../CourierReception/RouteListsPage/RouteListsPage';
import ScanRposPage from '../CourierReception/ScanRposPage/ScanRposPage';
import ApproveRpoStatusPage from '../CourierReception/ApproveRpoStatusPage/ApproveRpoStatusPage';
import TaskListPage from '../SendingToHighway/TaskListPage/TaskListPage';
import TaskPage from '../SendingToHighway/TaskPage/TaskPage';
import TaskReportPage from '../SendingToHighway/TaskReportPage/TaskReportPage';
import { WAREHOUSE_ROUTES } from '../Warehouse/constants';
import WarehousePage from '../Warehouse/WarehousePage/WarehousePage';
import Footer from '../Footer/Footer';

export class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
    };
  }

  render() {
    return (
      <div className="new-app">
        <Switch>
          <ProtectedRoute
            path="/main-menu"
            name="MainMenu"
            component={MainMenu}
            availableRoles={[
              ROLES.COORDINATOR, // Координатор
              ROLES.ADMIN, // Администратор
              ROLES.UKD_CHIEF, // Начальник УКД

              ROLES.SHIFT_SUPERVISOR, // Старший смены УКД
              ROLES.DISPATCHER, // Диспетчер УКД
              ROLES.STOCKROOMER, // Оператор Кладовой
              ROLES.UKD_OPERATOR, // Оператор УКД
            ]}
          />
          {/*RPO*/}
          <ProtectedRoute
            path="/rpo-registration"
            name="ScanRpo"
            component={ScanRpo}
            availableRoles={FEATURE_EDIT_ROLES.RPO_REGISTRATION}
          />
          <ProtectedRoute
            exact
            path="/rpo-details"
            name="RpoDetails"
            component={RpoDetails}
            availableRoles={FEATURE_EDIT_ROLES.RPO_REGISTRATION}
          />
          <ProtectedRoute
            exact
            path="/rpo-ticket-select"
            name="SelectLetterTicket"
            component={SelectLetterTicket}
            availableRoles={FEATURE_EDIT_ROLES.RPO_REGISTRATION}
          />
          <ProtectedRoute
            exact
            path="/rpo-confirmation"
            name="RpoConfirmation"
            component={RpoConfirmation}
            availableRoles={FEATURE_EDIT_ROLES.RPO_REGISTRATION}
          />
          <ProtectedRoute
            exact
            path="/rpo-view/:barcode"
            name="RpoView"
            component={RpoViewPage}
            availableRoles={FEATURE_EDIT_ROLES.RPO_REGISTRATION}
          />
          {/*Container*/}
          <ProtectedRoute
            exact
            path="/container-registration"
            name="ScanContainer"
            component={ScanContainerPage}
            availableRoles={FEATURE_EDIT_ROLES.CAPACITY_REGISTRATION}
          />
          <ProtectedRoute
            exact
            path="/capacity-registration"
            name="ScanCapacity"
            component={ScanCapacityPage}
            availableRoles={FEATURE_EDIT_ROLES.CAPACITY_REGISTRATION}
          />
          <ProtectedRoute
            exact
            path="/capacity-complete"
            name="CompleteCapacityConfirmation"
            component={CompleteCapacityConfirmation}
            availableRoles={FEATURE_EDIT_ROLES.CAPACITY_REGISTRATION}
          />
          <ProtectedRoute
            exact
            path="/capacity-continues"
            name="ContinuesCapacityConfirmation"
            component={ContinuesCapacityConfirmation}
            availableRoles={FEATURE_EDIT_ROLES.CAPACITY_REGISTRATION}
          />
          <ProtectedRoute
            exact
            path="/capacity-rpo-view/:barcode"
            name="CapacityRpoView"
            component={CapacityRpoViewPage}
            availableRoles={FEATURE_EDIT_ROLES.CAPACITY_REGISTRATION}
          />
          <ProtectedRoute
            exact
            path="/capacity-view/:containerBarcode/:id"
            name="CapacityView"
            component={CapacityViewPage}
            availableRoles={FEATURE_EDIT_ROLES.CAPACITY_REGISTRATION}
          />
          <ProtectedRoute
            exact
            path="/container-view/:barcode"
            name="ContainerView"
            component={ContainerViewPage}
            availableRoles={FEATURE_EDIT_ROLES.CAPACITY_REGISTRATION}
          />
          <ProtectedRoute
            exact
            path="/container-list"
            name="ContainerList"
            component={ContainerListPage}
            availableRoles={FEATURE_EDIT_ROLES.CAPACITY_REGISTRATION}
          />

          <Route exact path="/components" name="Components" component={Components} />
          <Route exact path="/components-rpo" name="ComponentsRpo" component={ComponentsRpo} />
          {/*Stockroom*/}
          <ProtectedRoute
            exact
            path={`/${STOCKROOM_ROUTES.stockroomTable}`}
            name="StockroomTable"
            component={StockroomTable}
            availableRoles={FEATURE_EDIT_ROLES.STOCKROOM}
          />
          <ProtectedRoute
            exact
            path={`/${STOCKROOM_ROUTES.stockroomDetail}/:barcode`}
            name="StockroomDetail"
            component={StockroomDetail}
            availableRoles={FEATURE_EDIT_ROLES.STOCKROOM}
          />
          <ProtectedRoute
            exact
            path={`/${STOCKROOM_ROUTES.stockroomEventsRpo}/:barcode`}
            name="EventsRpoTable"
            component={EventsRpoTable}
            availableRoles={FEATURE_EDIT_ROLES.STOCKROOM}
          />
          {/*UserManagement*/}
          <ProtectedRoute
            exact
            path="/user-management-table"
            name="UserManagementTable"
            component={UserManagementTable}
            availableRoles={FEATURE_EDIT_ROLES.USER_MANAGEMENT}
          />
          <ProtectedRoute
            exact
            path="/user-management-form"
            name="UserManagementForm"
            component={UserManagementFormPage}
            availableRoles={FEATURE_EDIT_ROLES.USER_MANAGEMENT_ADD_USERS}
          />
          <ProtectedRoute
            exact
            path="/user-management-form/:id"
            name="UserManagementForm"
            component={UserManagementFormPage}
            availableRoles={FEATURE_EDIT_ROLES.USER_MANAGEMENT}
          />
          {/*CourierDispatch*/}
          <ProtectedRoute
            exact
            path={`/${COURIER_DISPATCH_ROUTES.deliveryListPage}`}
            name="CouriersDispatchDeliveryList"
            component={CourierDispatchDeliveryListPage}
            availableRoles={FEATURE_EDIT_ROLES.COURIER_DISPATCH}
          />
          <ProtectedRoute
            exact
            path={`/${COURIER_DISPATCH_ROUTES.deliveryListPageCourier}`}
            name="CouriersDispatchDeliveryListSendCourier"
            component={CourierDispatchDeliveryListCourierPage}
            availableRoles={FEATURE_EDIT_ROLES.COURIER_DISPATCH}
          />
          <ProtectedRoute
            exact
            path={`/${COURIER_DISPATCH_ROUTES.scanRpos}/:deliveryListId`}
            name="CourierDispatchScanRposPage"
            component={CourierDispatchScanRposPage}
            availableRoles={FEATURE_EDIT_ROLES.COURIER_DISPATCH}
          />
          <ProtectedRoute
            exact
            path={`/${COURIER_DISPATCH_ROUTES.approveDeliveryListPage}/:deliveryListId`}
            name="CourierDispatchApproveDeliveryListPage"
            component={CourierDispatchApproveDeliveryListPage}
            availableRoles={FEATURE_EDIT_ROLES.COURIER_DISPATCH}
          />
          {/*CourierReception*/}
          <ProtectedRoute
            exact
            path={`/${COURIER_RECEPTION_ROUTES.routeListsPage}`}
            name="CourierReceptionRouteListsPage"
            component={RouteListsPage}
            availableRoles={FEATURE_EDIT_ROLES.COURIER_RECEPTION}
          />
          <ProtectedRoute
            exact
            path={`/${COURIER_RECEPTION_ROUTES.scanRposPage}/:routeListId`}
            name="CourierReceptionScanRposPage"
            component={ScanRposPage}
            availableRoles={FEATURE_EDIT_ROLES.COURIER_RECEPTION}
          />
          <ProtectedRoute
            exact
            path={`/${COURIER_RECEPTION_ROUTES.approveRpoStatusPage}/:routeListId`}
            name="CourierReceptionApproveRpoStatusPage"
            component={ApproveRpoStatusPage}
            availableRoles={FEATURE_EDIT_ROLES.COURIER_RECEPTION}
          />
          {/*CapacityForming*/}
          <ProtectedRoute
            exact
            path={`/${CAPACITY_FORMING_ROUTES.creationPage}`}
            name="CapacityFormingCreate"
            component={CapacityCreationPage}
            availableRoles={FEATURE_EDIT_ROLES.CAPACITY_FORMING}
          />
          <ProtectedRoute
            exact
            path={`/${CAPACITY_FORMING_ROUTES.editingPageRpos}/:id`}
            name="CapacityFormingEditRpos"
            component={CapacityEditingPage}
            availableRoles={FEATURE_EDIT_ROLES.CAPACITY_FORMING}
          />
          <ProtectedRoute
            exact
            path={`/${CAPACITY_FORMING_ROUTES.editingPageCapacities}/:id`}
            name="CapacityFormingEditCapacities"
            component={CapacityEditingPage}
            availableRoles={FEATURE_EDIT_ROLES.CAPACITY_FORMING}
          />
          <ProtectedRoute
            exact
            path={`/${CAPACITY_FORMING_ROUTES.closingPage}/:id`}
            name="CapacityFormingClose"
            component={CapacityClosingPage}
            availableRoles={FEATURE_EDIT_ROLES.CAPACITY_FORMING}
          />
          <ProtectedRoute
            exact
            path={`/${CAPACITY_FORMING_ROUTES.unforming}/:id`}
            name="CapacityUnformingPage"
            component={CapacityUnformingPage}
            availableRoles={FEATURE_EDIT_ROLES.CAPACITY_FORMING}
          />
          {/*UkdPassport*/}
          <ProtectedRoute
            exact
            path={`/${UKD_PASSPORT_ROUTES.ukdDetailPage}/:id`}
            name="UkdDetailPage"
            component={UkdDetailPage}
            availableRoles={FEATURE_EDIT_ROLES.UKD_PASSPORT}
          />
          {/*Inventory*/}
          <ProtectedRoute
            exact
            path={`/inventory-list`}
            name="InventoryList"
            component={InventoryListPage}
            availableRoles={FEATURE_EDIT_ROLES.INVENTORY}
          />
          <ProtectedRoute
            exact
            path={`/inventory/:id`}
            name="Inventory"
            component={InventoryPage}
            availableRoles={FEATURE_EDIT_ROLES.INVENTORY}
          />
          <ProtectedRoute
            exact
            path={`/inventory/:id/conflicts`}
            name="InventoryConflicts"
            component={InventoryConflictsPage}
            availableRoles={FEATURE_EDIT_ROLES.INVENTORY}
          />
          <ProtectedRoute
            exact
            path={`/inventory/:id/report`}
            name="InventoryReport"
            component={InventoryReportPage}
            availableRoles={FEATURE_EDIT_ROLES.INVENTORY}
          />
          {/*Highway task list*/}
          <ProtectedRoute
            exact
            path={`/highway-task-list`}
            name="TaskList"
            component={TaskListPage}
            availableRoles={FEATURE_EDIT_ROLES.HIGHWAY_TASKS}
          />
          <ProtectedRoute
            exact
            path={`/highway-task/:highway/:id`}
            name="Task"
            component={TaskPage}
            availableRoles={FEATURE_EDIT_ROLES.HIGHWAY_TASKS}
          />
          <ProtectedRoute
            exact
            path={`/highway-task/:highway/:id/report`}
            name="TaskReport"
            component={TaskReportPage}
            availableRoles={FEATURE_EDIT_ROLES.HIGHWAY_TASKS}
          />
          {/*Warehouse*/}
          <ProtectedRoute
            key={'warehouseCondition'}
            exact
            path={`/${WAREHOUSE_ROUTES.warehouseCondition}`}
            name="warehouseCondition"
            component={WarehousePage}
            availableRoles={FEATURE_EDIT_ROLES.WAREHOUSE}
          />

          <Redirect from="/" to="/main-menu" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withCommonDataRequest(MainPage);
