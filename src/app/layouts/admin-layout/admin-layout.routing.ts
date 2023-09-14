import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'profile',   component: UserProfileComponent },
    { path: 'all-jobs',     component: TableListComponent },
    { path: 'add-job',     component: TypographyComponent },
    { path: 'add-job/:id',     component: TypographyComponent }
];
