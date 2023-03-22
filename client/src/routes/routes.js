import TableAddRow from "~/components/AdminComponents/Table/TableAddRow"
import config from "~/config/config"
import Layout from "~/layouts/Layout"
import LayoutAdmin from "~/layouts/LayoutAdmin"
import CustomerAdd from "~/pages/managers/customers/CustomerForm/CustomerAdd"
import CustomerDetail from "~/pages/managers/customers/CustomerDetail"
import CustomerEdit from "~/pages/managers/customers/CustomerForm/CustomerEdit"
import CustomerManager from "~/pages/managers/customers/CustomerManager"
import Dashboard from "~/pages/managers/dashboard"
import Matter from "~/pages/managers/matters/Matter"
import MatterAdd from "~/pages/managers/matters/MatterAdd"
import StaffManager from "~/pages/managers/customers/StaffManager"
import StaffEdit from "~/pages/managers/customers/StaffForm/StaffEdit"
import StaffAdd from "~/pages/managers/customers/StaffForm/StaffAdd"

const publicRoutes = [
    // {path: config.routes.user.home, component: HomePage,  layout: UserLayout},
]

const privateRoutes = [
    // Dashboard
    { path: config.routes.admin.dashboard, component: Dashboard, layout: Layout },
    // Customer
    { path: config.routes.admin.customerManager, component: CustomerManager, layout: LayoutAdmin },
    { path: config.routes.admin.customerDetail, component: CustomerDetail, layout: LayoutAdmin },
    { path: config.routes.admin.customerEdit, component: CustomerEdit, layout: LayoutAdmin },
    { path: config.routes.admin.customerAdd, component: CustomerAdd, layout: LayoutAdmin },
    // Staff
    { path: config.routes.admin.staffManager, component: StaffManager, layout: LayoutAdmin },
    { path: config.routes.admin.staffDetail, component: CustomerDetail, layout: LayoutAdmin },
    { path: config.routes.admin.staffEdit, component: StaffEdit, layout: LayoutAdmin },
    { path: config.routes.admin.staffAdd, component: StaffAdd, layout: LayoutAdmin },
    // Matter
    { path: config.routes.admin.matterManager, component: Matter, layout: LayoutAdmin },
    { path: config.routes.admin.matetrAdd, component: MatterAdd, layout: LayoutAdmin },

    { path: config.routes.admin.table, component: TableAddRow, layout: LayoutAdmin },

]

export { privateRoutes, publicRoutes }