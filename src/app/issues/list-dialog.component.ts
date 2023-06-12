import { Component, OnDestroy, OnInit } from '@angular/core'
import { MessageService } from 'primeng/api'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'

import { Issue } from '@app/issues/model'
import { IssueService } from '@app/issues/service'

@Component({
  templateUrl: './list-dialog.component.pug',
  styleUrls: ['./list-dialog.component.sass'],
})
export class IssueListDialogComponent implements OnInit, OnDestroy {
  static getDefaultConfig(data: any): any {
    return {
      header: 'Issue List',
      width: '75vw',
      data,
    }
  }

  isLoading = false
  orgName!: string
  repoName!: string
  issues!: Issue[]
  private _subscriptions = new Subscription()

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private messageSrvc: MessageService,
    private issueSrvc: IssueService,
  ) {}

  ngOnInit(): void {
    this.orgName = this.config.data.orgName
    this.repoName = this.config.data.repoName
    this.loadIssues()
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe()
  }

  loadIssues(): void {
    this.isLoading = true
    const subscription = this.issueSrvc
      .getTopRepoIssues(this.orgName, this.repoName)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        issues => (this.issues = issues),
        (err: Error) =>
          this.messageSrvc.add({ severity: 'error', summary: 'Unable to load issues', detail: err.message }),
      )
    this._subscriptions.add(subscription)
  }

  close(): void {
    this.ref.close()
  }
}
