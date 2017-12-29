import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialPartsModule } from '../buildingblocks/materialparts.modules';

import * as cmp from './shared/components/index';

import { routerModule } from './shared/configurations/router.configuration';

const hashLocation = { provide: LocationStrategy, useClass: HashLocationStrategy };
const components = [
  cmp.SiteRootComponent,
  cmp.SiteHomeComponent,
  cmp.FormControlsComponent,
  cmp.IndicatorControlsComponent,
  cmp.LayoutControlsComponent,
  cmp.SiteAboutComponent,
  cmp.SiteHelpComponent
];

@NgModule({
  declarations: components,
  imports: [BrowserModule, routerModule, MaterialPartsModule, BrowserAnimationsModule],
  bootstrap: [cmp.SiteRootComponent],
  providers: [hashLocation]
})
export class AppModule {

}