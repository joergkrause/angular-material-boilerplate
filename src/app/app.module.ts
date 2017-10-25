import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../buildingblocks/material.modules';

import * as cmp from './shared/components/index';

@NgModule({
  declarations: [cmp.SiteRootComponent],
  imports: [BrowserModule, MaterialModule, BrowserAnimationsModule],
  bootstrap: [cmp.SiteRootComponent]
})
export class AppModule {

}