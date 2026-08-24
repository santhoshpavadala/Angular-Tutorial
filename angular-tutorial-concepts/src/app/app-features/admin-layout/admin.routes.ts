import { Routes } from "@angular/router";
import { AdminDashboard } from "./admin-dashboard/admin-dashboard";
import { authGuard } from "../../gaurds/auth-guard";
import { AdminUsers } from "./admin-users/admin-users";
import { AdminReports } from "./admin-reports/admin-reports";
import { AdminProducts } from "./admin-products/admin-products";
import { AdminLayout } from "./admin-layout";
import { adminAuthGuard } from "../../gaurds/admin-auth-guard";
import { unsavedChangesGuard } from "../../gaurds/unsaved-changes-guard";

export const ADMIN_ROUTES: Routes = [
    {
        path: "",
        component: AdminLayout,
        canActivateChild: [adminAuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'admindashboard',
                pathMatch: 'full'
            },
            {
                path: 'admindashboard',
                component: AdminDashboard
            },
            {
                path: 'admin-users',
                canDeactivate: [unsavedChangesGuard],
                component: AdminUsers
            },
            {
                path: 'admin-products',
                component: AdminProducts
            },
            {
                path: 'admin-reports',
                component: AdminReports
            }
        ]
        
    }
]