import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { Issue } from '@app/issues/model'

@Injectable()
export class IssueService {
  private apiUrl = 'https://api.github.com'

  constructor(private http: HttpClient) {}

  getTopRepoIssues(orgName: string, repoName: string): Observable<Issue[]> {
    const url = `${this.apiUrl}/repos/${orgName}/${repoName}/issues`
    return this.http.get<Issue[]>(url, {
      headers: { Accept: 'application/vnd.github+json' },
      params: {
        sort: 'created',
        direction: 'desc',
        per_page: 5,
      },
    })
  }
}
