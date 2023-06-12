import { Component, OnDestroy, OnInit } from '@angular/core'
import { MessageService } from 'primeng/api'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'

import { Repo } from '@app/repos/mode'
import { RepoService } from '@app/repos/service'
import { environment } from '@env/environment'

@Component({
  selector: 'app-repo-list',
  templateUrl: './list.component.pug',
  styleUrls: ['./list.component.sass'],
  providers: [MessageService],
})
export class RepoListComponent implements OnInit, OnDestroy {
  repos!: Repo[]
  selectedRepo: Repo | null = null
  isLoading = false
  private _subscriptions = new Subscription()

  constructor(private messageSrvc: MessageService, private repoSrvc: RepoService) {}

  ngOnInit(): void {
    this._loadRepos()
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe()
  }

  onRepoSelect(event: any): void {
    // TODO: this.eventBus.emit(AppEvent.SELECT_NODE, event.data.id)
  }

  private _loadRepos(): void {
    this.isLoading = true
    const subscription = this.repoSrvc
      .getRepos(environment.orgName)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        repos => (this.repos = repos),
        (err: Error) =>
          this.messageSrvc.add({
            severity: 'error',
            summary: 'Unable to load repos',
            detail: err.message,
          }),
      )
    this._subscriptions.add(subscription)
  }
}
