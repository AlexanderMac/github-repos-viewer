import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { CoreModule } from '@core/module'

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, CoreModule],
  exports: [CommonModule, FormsModule, HttpClientModule, CoreModule],
})
export class SharedModule {}
