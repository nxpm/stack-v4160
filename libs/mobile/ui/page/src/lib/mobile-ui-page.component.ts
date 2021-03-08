import { Component, Input } from '@angular/core'

@Component({
  selector: 'ui-page',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ pageTitle }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ pageTitle }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ng-content></ng-content>
    </ion-content>
  `,
})
export class MobileUiPageComponent {
  @Input() pageTitle: string = 'ui-page'
}
