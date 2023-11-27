import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Cards } from './cards.component'

const routes = [
  {
    path: '',
    component: Cards,
  },
]

@NgModule({
  declarations: [Cards],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Cards],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardsModule {}
