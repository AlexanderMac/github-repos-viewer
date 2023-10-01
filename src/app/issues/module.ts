import { NgModule } from '@angular/core'

import { IssueListDialogComponent } from '@app/issues/list-dialog.component'
import { IssueService } from '@app/issues/service'
import { SharedModule } from '@shared/module'

@NgModule({
  providers: [IssueService],
  declarations: [IssueListDialogComponent],
  imports: [SharedModule],
  exports: [IssueListDialogComponent],
})
export class IssuesModule {}
