import config from "~/config/config"
import Layout from "~/layouts/Layout"
import LayoutAdmin from "~/layouts/LayoutAdmin"
import Customer from "~/pages/managers/customers/Customer"
import CustomerAdd from "~/pages/managers/customers/CustomerAdd"
import CustomerDetail from "~/pages/managers/customers/CustomerDetail"
import CustomerEdit from "~/pages/managers/customers/CustomerEdit"
import Dashboard from "~/pages/managers/dashboard"
import Matters from "~/pages/managers/matters/Matter"

const publicRoutes = [
    // {path: config.routes.user.home, component: HomePage,  layout: UserLayout},
]

const privateRoutes = [
    // Dashboard
    { path: config.routes.admin.dashboard, component: Dashboard, layout: Layout },
    // Customer
    { path: config.routes.admin.customerManager, component: Customer, layout: LayoutAdmin },
    { path: config.routes.admin.customerDetail, component: CustomerDetail, layout: LayoutAdmin },
    { path: config.routes.admin.customerEdit, component: CustomerEdit, layout: LayoutAdmin },
    { path: config.routes.admin.customerAdd, component: CustomerAdd, layout: LayoutAdmin },
    // Matter
    { path: config.routes.admin.matterManager, component: Matters, layout: LayoutAdmin },
]

export { privateRoutes, publicRoutes }