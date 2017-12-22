import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialPartsModule } from '../buildingblocks/materialparts.modules';

import * as cmp from './shared/components/index';

import routerConfig from './shared/configurations/router.configuration';

@NgModule({
  declarations: [cmp.SiteRootComponent, cmp.FormControlsComponent, cmp.IndicatorControlsComponent, cmp.LayoutControlsComponent ],
  imports: [BrowserModule, RouterModule.forRoot(routerConfig), MaterialPartsModule, BrowserAnimationsModule],
  bootstrap: [cmp.SiteRootComponent]

})
export class AppModule {

}