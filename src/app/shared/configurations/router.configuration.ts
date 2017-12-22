import { Routes } from '@angular/router';

import * as cmp from '../components/index';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full'
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

export default routes;
