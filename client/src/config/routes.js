const routes = {
    login: '/login',
    register: '/register',
    user: {
        home: '/',
        service: '/service',
    },
    admin: {
        dashboard: '/',
        // Customer
        customerManager: '/customer',
        customerDetail: '/customer/:id',
        customerEdit: '/customer/edit/:id',
        customerAdd: '/customer/add',
        // Staff
        staffManager: '/staff',
        staffDetail: '/staff/:id',
        staffEdit: '/staff/edit/:id',
        staffAdd: '/staff/add',
        // Matter
        matterManager: '/matter',
        matetrAdd: '/matter/add',
        
        //Quotes
        quotesManager: '/quotes',
        quotesAdd: '/quotes/add'
    }
}
export default routes;