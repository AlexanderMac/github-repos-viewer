import { NgModule } from '@angular/core'

import { IssuesModule } from '@app/issues/module'
import { RepoListComponent } from '@app/repos/list.component'
import { RepoService } from '@app/repos/service'
import { SharedModule } from '@shared/module'

@NgModule({
  providers: [RepoService],
  imports: [SharedModule, IssuesModule],
  declarations: [RepoListComponent],
  exports: [RepoListComponent],
})
export class ReposModule {}
