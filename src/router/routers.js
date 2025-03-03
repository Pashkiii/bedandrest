import HelloWorld from "../components/HelloWorld.vue";
import BookingsPage from "../views/booking/bookings/BookingsPage.vue";
import BookingPage from "../views/booking/booking/BookingPage.vue";
import ApartmentsPage from "../views/apartment/apartments/ApartmentsPage.vue";
import EmployeesPage from "../views/employees/EmployeesPage.vue";

export const routes = [
    {
        path: '/',
        component: HelloWorld,
    },
    {
        path: '/bookings',
        component: BookingsPage,
    },
    {
        path: '/booking/:id',
        component: BookingPage,
    },
    {
        path: '/apartments',
        component: ApartmentsPage
    },
    {
        path: '/employees',
        component: EmployeesPage
    }
];
