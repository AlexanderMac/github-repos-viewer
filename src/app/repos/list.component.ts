import { Component, OnDestroy, OnInit } from '@angular/core'
import { MessageService } from 'primeng/api'
import { DialogService } from 'primeng/dynamicdialog'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'

import { IssueListDialogComponent } from '@app/issues/list-dialog.component'
import { Repo } from '@app/repos/model'
import { ListParams, RepoService } from '@app/repos/service'
import { environment } from '@env/environment'

@Component({
  selector: 'app-repo-list',
  templateUrl: './list.component.pug',
  styleUrls: ['./list.component.sass'],
  providers: [DialogService, MessageService],
})
export class RepoListComponent implements OnInit, OnDestroy {
  repos!: Repo[]
  selectedRepo: Repo | null = null
  prevSelectedRepo: Repo | null = null
  isLoading = false
  rowsPerPage = 10
  repoTotalCount = 0
  private _subscriptions = new Subscription()

  constructor(private messageSrvc: MessageService, private dialogSrvc: DialogService, private repoSrvc: RepoService) {}

  ngOnInit(): void {
    this.loadTotalCount()
    this.loadRepos()
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe()
  }

  loadTotalCount() {
    this.isLoading = true
    const subscription = this.repoSrvc
      .getRepoTotalCount(environment.orgName)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        repoTotalCount => (this.repoTotalCount = repoTotalCount),
        (err: Error) =>
          this.messageSrvc.add({
            severity: 'error',
            summary: 'Unable to load repo total count',
            detail: err.message,
          }),
      )
    this._subscriptions.add(subscription)
  }

  loadRepos(params?: ListParams): void {
    this.isLoading = true
    const subscription = this.repoSrvc
      .getRepos(environment.orgName, params)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        repos => {
          this.repos = repos
        },
        (err: Error) =>
          this.messageSrvc.add({
            severity: 'error',
            summary: 'Unable to load repos',
            detail: err.message,
          }),
      )
    this._subscriptions.add(subscription)
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  onRepoSelect(event: any): void {
    this.prevSelectedRepo = this.selectedRepo
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  onRepoDoubleClick(event: any): void {
    if (!this.prevSelectedRepo) {
      return
    }
    const subscription = this.dialogSrvc
      .open(
        IssueListDialogComponent,
        IssueListDialogComponent.getDefaultConfig({
          orgName: environment.orgName,
          repoName: this.prevSelectedRepo.name,
        }),
      )
      .onClose.subscribe(
        () => null,
        (err: Error) =>
          this.messageSrvc.add({ severity: 'error', summary: 'Unable to get the repo issues', detail: err.message }),
      )
    this._subscriptions.add(subscription)
  }

  onPageChange(event: any): void {
    this.loadRepos({
      pagination: {
        page: event.page + 1,
        rowsPerPage: event.rows,
      },
    })
  }
}
