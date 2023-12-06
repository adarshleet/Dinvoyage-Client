const userRoutes={
    signup: '/api/user/signup',

    otpVerify : '/api/user/otpVerify',

    login : '/api/user/login',
    
    logout : '/api/user/logout',


    findUser : '/api/user/findUser',

    findUserById:'/api/user/findUserById',

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


    payWithWallet : '/api/user/payWithWallet',

    //user bookings
    userBookings : '/api/user/allbookings',

    cancelBooking :'/api/user/cancelBooking',

    //search restaurants
    searchRestaurants : '/api/user/search',

    filterRestaurants : '/api/user/filterRestaurants',


    //coupons
    couponsToShow : '/api/user/couponsToShow',


    //new chat creating
    newConversation : '/api/user/newConversation',

    //get messages 
    getMessages : '/api/user/getMessages',

    //new message
    newMessage : '/api/user/newMessage',

    //get conversations
    getConversations : '/api/user/getConversations',


    //get conversation by id
    getConversation : '/api/user/getConversation'


}

export default userRoutes