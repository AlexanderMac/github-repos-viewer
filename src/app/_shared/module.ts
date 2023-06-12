import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { DialogModule } from 'primeng/dialog'
import { PaginatorModule } from 'primeng/paginator'
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'

import { CoreModule } from '@core/module'

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    // PrimeNg
    TableModule,
    ToastModule,
    PaginatorModule,
    DialogModule,
  ],
})
export class SharedModule {}
