import { Routes } from "@angular/router";
import { UserDashboard } from "./user-dashboard/user-dashboard";

export const USERDASHBOARD_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'userdashboard',
        pathMatch: 'full'
    },
    {
        path: 'userdashboard',
        component: UserDashboard
    },
]