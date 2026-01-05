import { Routes } from '@angular/router';


export const routes: Routes = [
  
  //Auth Routes//
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then((m) => m.LoginComponent) },
{ path: 'forgot-password', loadComponent: () => import('./auth/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent) },
{ path: 'register', loadComponent: () => import('./auth/register/register.component').then((m) => m.RegisterComponent) },
{ path: 'change-password', loadComponent: () => import('./auth/change-password/change-password.component').then((m) => m.ChangePasswordComponent) },
{ path: 'coming-soon', loadComponent: () => import('./auth/coming-soon/coming-soon.component').then((m) => m.ComingSoonComponent) },
{ path: 'under-maintenance', loadComponent: () => import('./auth/under-maintenance/under-maintenance.component').then((m) => m.UnderMaintenanceComponent) },
{ path: 'error-500', loadComponent: () => import('./auth/error-500/error-500.component').then((m) => m.Error500Component) },
{ path: 'error-404', loadComponent: () => import('./auth/error-404/error-404.component').then((m) => m.Error404Component) },

  
  //Features Routes//
  {
    path: '', loadComponent: () => import('./features/features.component').then((m) => m.FeaturesComponent),
    children: [
      { path: '', loadComponent: () => import('./features/home-pages/home/home.component').then((m) => m.HomeComponent) },
      { path: 'index', loadComponent: () => import('./features/home-pages/home/home.component').then((m) => m.HomeComponent) },
      { path: 'index-2', loadComponent: () => import('./features/home-pages/home-2/home-2.component').then((m) => m.Home2Component) },
      { path: 'index-3', loadComponent: () => import('./features/home-pages/home-3/home-3.component').then((m) => m.Home3Component) },
      { path: 'index-4', loadComponent: () => import('./features/home-pages/home-4/home-4.component').then((m) => m.Home4Component) },
      { path: 'index-5', loadComponent: () => import('./features/home-pages/home-5/home-5.component').then((m) => m.Home5Component) },
      { path: 'index-6', loadComponent: () => import('./features/home-pages/home-6/home-6.component').then((m) => m.Home6Component) },
      { path: 'flight', loadComponent: () => import('./features/flight/flight.component').then((m) => m.FlightComponent),
        children:[
          { path: 'flight-list', loadComponent: () => import('./features/flight/flight-list/flight-list.component').then(m => m.FlightListComponent) },
          { path: 'flight-grid', loadComponent: () => import('./features/flight/flight-grid/flight-grid.component').then(m => m.FlightGridComponent) },
          { path: 'flight-details', loadComponent: () => import('./features/flight/flight-details/flight-details.component').then(m => m.FlightDetailsComponent) },
          { path: 'flight-booking-confirmation', loadComponent: () => import('./features/flight/flight-booking-confirmation/flight-booking-confirmation.component').then(m => m.FlightBookingConfirmationComponent) },
          { path: 'add-flight', loadComponent: () => import('./features/flight/add-flight/add-flight.component').then(m => m.AddFlightComponent) },
          { path: 'flight-booking', loadComponent: () => import('./features/flight/flight-booking/flight-booking.component').then(m => m.FlightBookingComponent) },
          { path: 'edit-flight', loadComponent: () => import('./features/flight/edit-flight/edit-flight.component').then(m => m.EditFlightComponent) },
        ]
       },
       { path: 'hotel', loadComponent: () => import('./features/hotel/hotel.component').then((m) => m.HotelComponent) ,
        children:[
          { path: 'hotel-map', loadComponent: () => import('./features/hotel/hotel-map/hotel-map.component').then(m => m.HotelMapComponent) },
          { path: 'hotel-list', loadComponent: () => import('./features/hotel/hotel-list/hotel-list.component').then(m => m.HotelListComponent) },
          { path: 'hotel-grid', loadComponent: () => import('./features/hotel/hotel-grid/hotel-grid.component').then(m => m.HotelGridComponent) },
          { path: 'hotel-details', loadComponent: () => import('./features/hotel/hotel-details/hotel-details.component').then(m => m.HotelDetailsComponent) },
          { path: 'hotel-booking', loadComponent: () => import('./features/hotel/hotel-booking/hotel-booking.component').then(m => m.HotelBookingComponent) },
          { path: 'add-hotel', loadComponent: () => import('./features/hotel/add-hotel/add-hotel.component').then(m => m.AddHotelComponent) },
          { path: 'booking-confirmation', loadComponent: () => import('./features/hotel/booking-confirmation/booking-confirmation.component').then(m => m.BookingConfirmationComponent) },
          { path: 'edit-hotel', loadComponent: () => import('./features/hotel/edit-hotel/edit-hotel.component').then(m => m.EditHotelComponent) },
        ]
       },
       { path: 'car', loadComponent: () => import('./features/car/car.component').then((m) => m.CarComponent),
        children:[
              { path: 'car-list', loadComponent: () => import('./features/car/car-list/car-list.component').then(m => m.CarListComponent) },
              { path: 'car-grid', loadComponent: () => import('./features/car/car-grid/car-grid.component').then(m => m.CarGridComponent) },
              { path: 'car-details', loadComponent: () => import('./features/car/car-details/car-details.component').then(m => m.CarDetailsComponent) },
              { path: 'car-map', loadComponent: () => import('./features/car/car-map/car-map.component').then(m => m.CarMapComponent) },
              { path: 'car-booking-confirmation', loadComponent: () => import('./features/car/car-booking-confirmation/car-booking-confirmation.component').then(m => m.CarBookingConfirmationComponent) },
              { path: 'add-car', loadComponent: () => import('./features/car/add-car/add-car.component').then(m => m.AddCarComponent) },
              { path: 'car-booking', loadComponent: () => import('./features/car/car-booking/car-booking.component').then(m => m.CarBookingComponent) },
              { path: 'edit-car', loadComponent: () => import('./features/car/edit-car/edit-car.component').then(m => m.EditCarComponent) },
           
        ]
        },
       { path: 'cruise', loadComponent: () => import('./features/cruise/cruise.component').then((m) => m.CruiseComponent),
         children:[
      { path: 'cruise-list', loadComponent: () => import('./features/cruise/cruise-list/cruise-list.component').then(m => m.CruiseListComponent) },
      { path: 'cruise-grid', loadComponent: () => import('./features/cruise/cruise-grid/cruise-grid.component').then(m => m.CruiseGridComponent) },
      { path: 'cruise-details', loadComponent: () => import('./features/cruise/cruise-details/cruise-details.component').then(m => m.CruiseDetailsComponent) },
      { path: 'cruise-map', loadComponent: () => import('./features/cruise/cruise-map/cruise-map.component').then(m => m.CruiseMapComponent) },
      { path: 'cruise-booking-confirmation', loadComponent: () => import('./features/cruise/cruise-booking-confirmation/cruise-booking-confirmation.component').then(m => m.CruiseBookingConfirmationComponent) },
      { path: 'add-cruise', loadComponent: () => import('./features/cruise/add-cruise/add-cruise.component').then(m => m.AddCruiseComponent) },
      { path: 'cruise-booking', loadComponent: () => import('./features/cruise/cruise-booking/cruise-booking.component').then(m => m.CruiseBookingComponent) },
      { path: 'edit-cruise', loadComponent: () => import('./features/cruise/edit-cruise/edit-cruise.component').then(m => m.EditCruiseComponent) },
    ] 
        },
       { path: 'tour', loadComponent: () => import('./features/tour/tour.component').then((m) => m.TourComponent),
        children:[
      { path: 'tour-list', loadComponent: () => import('./features/tour/tour-list/tour-list.component').then(m => m.TourListComponent) },
      { path: 'tour-grid', loadComponent: () => import('./features/tour/tour-grid/tour-grid.component').then(m => m.TourGridComponent) },
      { path: 'tour-details', loadComponent: () => import('./features/tour/tour-details/tour-details.component').then(m => m.TourDetailsComponent) },
      { path: 'tour-details/:url', loadComponent: () => import('./features/tour/tour-details/tour-details.component').then(m => m.TourDetailsComponent) },
      { path: ':url', loadComponent: () => import('./features/tour/tour-details/tour-details.component').then(m => m.TourDetailsComponent) },
      { path: 'details', loadComponent: () => import('./features/tour/tour-details/tour-details.component').then(m => m.TourDetailsComponent) },
      { path: 'details/:id', loadComponent: () => import('./features/tour/tour-details/tour-details.component').then(m => m.TourDetailsComponent) },
      { path: 'tour-map', loadComponent: () => import('./features/tour/tour-map/tour-map.component').then(m => m.TourMapComponent) },
      { path: 'tour-booking-confirmation', loadComponent: () => import('./features/tour/tour-booking-confirmation/tour-booking-confirmation.component').then(m => m.TourBookingConfirmationComponent) },
      { path: 'add-tour', loadComponent: () => import('./features/tour/add-tour/add-tour.component').then(m => m.AddTourComponent) },
      { path: 'tour-booking', loadComponent: () => import('./features/tour/tour-booking/tour-booking.component').then(m => m.TourBookingComponent) },
  { path: 'edit-tour', loadComponent: () => import('./features/tour/edit-tour/edit-tour.component').then(m => m.EditTourComponent) },
    ]
        },
        { path: 'pages', loadComponent: () => import('./features/pages/pages.component').then((m) => m.PagesComponent),
          children:[
            { path: 'about-us', loadComponent: () => import('./features/pages/about-us/about-us.component').then(m => m.AboutUsComponent) },
{ path: 'gallery', loadComponent: () => import('./features/pages/gallery/gallery.component').then(m => m.GalleryComponent) },
{ path: 'testimonial', loadComponent: () => import('./features/pages/testimonial/testimonial.component').then(m => m.TestimonialComponent) },
{ path: 'faq', loadComponent: () => import('./features/pages/faq/faq.component').then(m => m.FaqComponent) },
{ path: 'pricing-plan', loadComponent: () => import('./features/pages/pricing-plan/pricing-plan.component').then(m => m.PricingPlanComponent) },
{ path: 'team', loadComponent: () => import('./features/pages/team/team.component').then(m => m.TeamComponent) },
{ path: 'invoices', loadComponent: () => import('./features/pages/invoices/invoices.component').then(m => m.InvoicesComponent) },
{ path: 'blog-grid', loadComponent: () => import('./features/pages/blog-grid/blog-grid.component').then(m => m.BlogGridComponent) },
{ path: 'blog-list', loadComponent: () => import('./features/pages/blog-list/blog-list.component').then(m => m.BlogListComponent) },
{ path: 'blog-details', loadComponent: () => import('./features/pages/blog-details/blog-details.component').then(m => m.BlogDetailsComponent) },
{ path: 'contact-us', loadComponent: () => import('./features/pages/contact-us/contact-us.component').then(m => m.ContactUsComponent) },
{ path: 'destination', loadComponent: () => import('./features/pages/destination/destination.component').then(m => m.DestinationComponent) },
{ path: 'terms-conditions', loadComponent: () => import('./features/pages/terms-conditions/terms-conditions.component').then(m => m.TermsConditionsComponent) },
{ path: 'privacy-policy', loadComponent: () => import('./features/pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent) },
{ path: 'become-an-expert', loadComponent: () => import('./features/pages/become-an-expert/become-an-expert.component').then(m => m.BecomeAnExpertComponent) },
{ path: 'index-rtl', loadComponent: () => import('./features/pages/index-rtl/index-rtl.component').then(m => m.IndexRtlComponent) },
          ]
         },
      { path: 'user', loadComponent: () => import('./features/user/user.component').then((m) => m.UserComponent),
        children: [
      { path: 'customer-flight-booking', loadComponent: () => import('./features/user/customer-flight-booking/customer-flight-booking.component').then(m => m.CustomerFlightBookingComponent) },
      { path: 'dashboard', loadComponent: () => import('./features/user/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'customer-hotel-booking', loadComponent: () => import('./features/user/customer-hotel-booking/customer-hotel-booking.component').then(m => m.CustomerHotelBookingComponent) },
      { path: 'customer-car-booking', loadComponent: () => import('./features/user/customer-car-booking/customer-car-booking.component').then(m => m.CustomerCarBookingComponent) },
      { path: 'customer-cruise-booking', loadComponent: () => import('./features/user/customer-cruise-booking/customer-cruise-booking.component').then(m => m.CustomerCruiseBookingComponent) },
      { path: 'customer-tour-booking', loadComponent: () => import('./features/user/customer-tour-booking/customer-tour-booking.component').then(m => m.CustomerTourBookingComponent) },
      { path: 'review', loadComponent: () => import('./features/user/review/review.component').then(m => m.ReviewComponent) },
      { path: 'chat', loadComponent: () => import('./features/user/chat/chat.component').then(m => m.ChatComponent) },
      { path: 'wishlist', loadComponent: () => import('./features/user/wishlist/wishlist.component').then(m => m.WishlistComponent) },
      { path: 'wallet', loadComponent: () => import('./features/user/wallet/wallet.component').then(m => m.WalletComponent) },
      { path: 'payment', loadComponent: () => import('./features/user/payment/payment.component').then(m => m.PaymentComponent) },
      { path: 'my-profile', loadComponent: () => import('./features/user/my-profile/my-profile.component').then(m => m.MyProfileComponent) },
      { path: 'notification', loadComponent: () => import('./features/user/notification/notification.component').then(m => m.NotificationComponent) },
      { path: 'settings', loadComponent: () => import('./features/user/settings/settings.component').then(m => m.SettingsComponent) },
       { path: 'profile-settings', loadComponent: () => import('./features/user/settings/profile-settings/profile-settings.component').then(m => m.ProfileSettingsComponent) },
       { path: 'security-settings', loadComponent: () => import('./features/user/settings/security-settings/security-settings.component').then(m => m.SecuritySettingsComponent) },
  { path: 'notification-settings', loadComponent: () => import('./features/user/settings/notification-settings/notification-settings.component').then(m => m.NotificationSettingsComponent) },
  { path: 'integration-settings', loadComponent: () => import('./features/user/settings/integration-settings/integration-settings.component').then(m => m.IntegrationSettingsComponent) },

    ]
       },
      { path: 'agent', loadComponent: () => import('./features/agent/agent.component').then((m) => m.AgentComponent),
        children: [
      { path: 'reviews', loadComponent: () => import('./features/agent/review/review.component').then((m) => m.ReviewComponent),
      },
      { path: 'hotel-booking', loadComponent: () => import('./features/agent/hotel-bookings/hotel-bookings.component').then(m => m.HotelBookingsComponent) },
      { path: 'settings', loadComponent: () => import('./features/agent/settings/setting/setting.component').then(m => m.SettingComponent) },
      { path: 'account-settings', loadComponent: () => import('./features/agent/settings/account-settings/account-settings.component').then(m => m.AccountSettingsComponent) },
      { path: 'security-settings', loadComponent: () => import('./features/agent/settings/security-settings/security-settings.component').then(m => m.SecuritySettingsComponent) },
      { path: 'plans-settings', loadComponent: () => import('./features/agent/settings/plans-settings/plans-settings.component').then(m => m.PlansSettingsComponent) },
      { path: 'agent-dashboard', loadComponent: () => import('./features/agent/agent-dashboard/agent-dashboard.component').then(m => m.AgentDashboardComponent) },
      { path: 'flight-booking', loadComponent: () => import('./features/agent/flight-booking/flight-booking.component').then(m => m.FlightBookingComponent) },
      { path: 'car-booking', loadComponent: () => import('./features/agent/car-booking/car-booking.component').then(m => m.CarBookingComponent) },
      { path: 'cruise-booking', loadComponent: () => import('./features/agent/cruise-booking/cruise-booking.component').then(m => m.CruiseBookingComponent) },
      { path: 'tour-booking', loadComponent: () => import('./features/agent/tour-booking/tour-booking.component').then(m => m.TourBookingComponent) },
      { path: 'listings', loadComponent: () => import('./features/agent/listings/listings.component').then(m => m.ListingsComponent), },
      { path: 'enquirers', loadComponent: () => import('./features/agent/enquirers/enquirers.component').then(m => m.EnquirersComponent) },
      { path: 'earnings', loadComponent: () => import('./features/agent/earnings/earnings.component').then(m => m.EarningsComponent) },
      { path: 'agent-notification', loadComponent: () => import('./features/agent/agent-notification/agent-notification.component').then(m => m.AgentNotificationComponent) },
    ],
       },
    ]
  }
]as const;
