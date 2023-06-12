import { NgModule } from '@angular/core'

import { RepoListComponent } from '@app/repos/list.component'
import { RepoService } from '@app/repos/service'
import { SharedModule } from '@shared/module'

@NgModule({
  providers: [RepoService],
  imports: [SharedModule],
  declarations: [RepoListComponent],
  exports: [RepoListComponent],
})
export class ReposModule {}
