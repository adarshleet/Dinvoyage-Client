const userRoutes={
    signup: '/api/user/signup',

    otpVerify : '/api/user/otpVerify',

    login : '/api/user/login',
    
    logout : '/api/user/logout',



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

    cancelBooking :'/api/user/cancelBooking'

}

export default userRoutes