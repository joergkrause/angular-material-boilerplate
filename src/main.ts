import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

//import { AppModule } from './app/app.module';
import { AppModuleNgFactory } from './app/app.module.ngfactory';

enableProdMode();
//platformBrowserDynamic().bootstrapModule(AppModule);
platformBrowserDynamic().bootstrapModuleFactory(AppModuleNgFactory);