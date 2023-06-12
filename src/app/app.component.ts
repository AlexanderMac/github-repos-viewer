import { Component } from '@angular/core'
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  providers: [MessageService],
})
export class AppComponent {}
