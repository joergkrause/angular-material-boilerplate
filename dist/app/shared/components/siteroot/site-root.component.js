"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SiteRootComponent = (function () {
    function SiteRootComponent() {
    }
    return SiteRootComponent;
}());
SiteRootComponent = __decorate([
    core_1.Component({selector: 'site-root',
        styles: ["h1 { color: red; }"],
        template: "<div> <mat-toolbar color=\"primary\"> <span><mat-icon>mood</mat-icon></span> <span>Yay, Material in Angular 2!</span> <button mat-icon-button [mat-menu-trigger-for]=\"menu\"> <mat-icon>more_vert</mat-icon> </button> </mat-toolbar> <mat-menu x-position=\"before\" #menu=\"matMenu\"> <button mat-menu-item>Option 1</button> <button mat-menu-item>Option 2</button> </mat-menu> <mat-card> <button mat-button>All</button> <button mat-raised-button>Of</button> <button mat-raised-button color=\"primary\">The</button> <button mat-raised-button color=\"accent\">Buttons</button> </mat-card> <span class=\"done\"> <button mat-fab> <mat-icon>check circle</mat-icon> </button> </span> </div> <button mat-icon-button [matMenuTriggerFor]=\"menu\"> <mat-icon>more_vert</mat-icon> </button> <mat-menu #menu=\"matMenu\"> <button mat-menu-item> <mat-icon>dialpad</mat-icon> <span>Redial</span> </button> <button mat-menu-item disabled> <mat-icon>voicemail</mat-icon> <span>Check voicemail</span> </button> <button mat-menu-item> <mat-icon>notifications_off</mat-icon> <span>Disable alerts</span> </button> </mat-menu>"
    })
], SiteRootComponent);
exports.SiteRootComponent = SiteRootComponent;
//# sourceMappingURL=site-root.component.js.map