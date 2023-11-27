import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { Frame141 } from './frame141/frame141.component'
import { AccommodationCard } from './accommodation-card/accommodation-card.component'
import { AppComponent } from './component/component.component'

@NgModule({
  declarations: [Frame141, AccommodationCard, AppComponent],
  imports: [CommonModule, RouterModule],
  exports: [Frame141, AccommodationCard, AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
