import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { LoginComponent } from './login.component'

const routes = [
  {
    path: '',
    component: LoginComponent,
  },
]

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [LoginComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginModule {}
