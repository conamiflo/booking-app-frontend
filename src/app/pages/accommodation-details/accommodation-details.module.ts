import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { AccommodationDetails } from './accommodation-details.component'

const routes = [
  {
    path: '',
    component: AccommodationDetails,
  },
]

@NgModule({
  declarations: [AccommodationDetails],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [AccommodationDetails],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccommodationDetailsModule {}
