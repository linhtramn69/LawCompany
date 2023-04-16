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
        matterList: '/matters/:id',
        matterAdd: '/matter/add',
        matterDetail: '/matter/:id',
        matterEdit: '/matter/edit/:id',
        // Task
        taskList: '/tasks/:id',

        //Quotes
        quotesManager: '/quote',
        quotesAdd: '/quotes/add',
        quoteDetail: '/quotes/:id',
        quoteDetail: '/quotes/:id',
        quoteEdit: '/quotes/edit/:id',

        //Calendar
        calendarManager: '/calendar',

        //Fee
        feeManager: '/fee',
        feeList: '/fees',
        feeDetail: '/fees/:id'
    },
    staff: {
       matterManager: '/',
        matterList: '/matters/:id',
        matterAdd: '/matter/add',
        matterDetail: '/matter/:id',
        matterEdit: '/matter/edit/:id',
        calendarManager: '/calendar'

    },
    tvv: {
        taskManager: '/',
        taskList: '/tasks',
        quotesManager: '/quotes',
    },
    keToan: {
        feeManager: '/',
        feeList: '/fees',
        feeDetail: '/fees/:id'
    }
}
export default routes;