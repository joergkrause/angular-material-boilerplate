import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialPartsModule } from '../buildingblocks/materialparts.modules';

import * as cmp from './shared/components/index';

import { routerModule } from './shared/configurations/router.configuration';

@NgModule({
  declarations: [cmp.SiteRootComponent, cmp.SiteHomeComponent, cmp.FormControlsComponent, cmp.IndicatorControlsComponent, cmp.LayoutControlsComponent ],
  imports: [BrowserModule, routerModule, MaterialPartsModule, BrowserAnimationsModule],
  bootstrap: [cmp.SiteRootComponent]

})
export class AppModule {

}