import { Routes, RouterModule } from '@angular/router';

import * as cmp from '../components/index';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    component: cmp.SiteHomeComponent,
    path: 'home'
  },
  {
    component: cmp.FormControlsComponent,
    path: 'forms'
  },
  {
    component: cmp.LayoutControlsComponent,
    path: 'layout'
  },
  {
    component: cmp.IndicatorControlsComponent,
    path: 'indicator'
  }
];

export const routerModule = RouterModule.forRoot(routes);
