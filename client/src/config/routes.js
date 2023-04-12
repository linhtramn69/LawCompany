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
        matterList: '/matters',
        matterAdd: '/matter/add',
        matterDetail: '/matters/:id',
        matterEdit: '/matter/edit/:id',
        //Quotes
        quotesManager: '/quotes',
        quotesAdd: '/quotes/add',
        quoteDetail: '/quotes/:id',
        quoteDetail: '/quotes/:id',
        quoteEdit: '/quotes/edit/:id',

        //Calendar
        calendarManager: '/calendar'
    },
    staff: {
        matterManager: '/',
        matetrList: '/matters',
        matterDetail: '/matters/:id',
        matetrEdit: '/matter/edit/:id',
        calendarManager: '/calendar'

    }
}
export default routes;