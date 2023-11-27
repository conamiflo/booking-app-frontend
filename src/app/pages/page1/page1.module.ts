import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Page1 } from './page1.component'

const routes = [
  {
    path: '',
    component: Page1,
  },
]

@NgModule({
  declarations: [Page1],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Page1],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Page1Module {}
