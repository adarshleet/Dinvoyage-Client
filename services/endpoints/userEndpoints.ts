const userRoutes={
    signup: '/api/user/signup',

    otpVerify : '/api/user/otpVerify',

    login : '/api/user/login',
    
    logout : '/api/user/logout',


    findUser : '/api/user/findUser',

    changeName : '/api/user/changeName',

    verifyNewMobile : '/api/user/verifyNewMobile',

    changeMobile : '/api/user/changeMobile',

    changePassword : '/api/user/changePassword',


    restaurantsToShow : '/api/user/restaurantsToDisplay',

    singleRestaurant : '/api/user/singleRestaurant',


    allKitchenItems : '/api/user/allKitchenItems',


    //booking side
    seatCountsLeft : '/api/user/tableCounts',

    kitchenItems : '/api/user/kitchenItems',


    //make payment
    payment : '/api/user/proceedToPayment',

    //user bookings
    userBookings : '/api/user/allbookings',

    cancelBooking :'/api/user/cancelBooking',

    //search restaurants
    searchRestaurants : '/api/user/search',

    filterRestaurants : '/api/user/filterRestaurants'

}

export default userRoutes