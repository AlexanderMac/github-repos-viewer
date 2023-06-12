import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Repo } from '@app/repos/model'

export type ListParams = {
  pagination?: {
    page: number
    rowsPerPage: number
  }
}

@Injectable()
export class RepoService {
  private apiUrl = 'https://api.github.com'

  constructor(private http: HttpClient) {}

  getRepoTotalCount(orgName: string): Observable<number> {
    const url = `${this.apiUrl}/orgs/${orgName}`
    return this.http
      .get<{ public_repos: number }>(url, {
        headers: { Accept: 'application/vnd.github+json' },
      })
      .pipe(map(org => org.public_repos))
  }

  getRepos(orgName: string, { pagination }: ListParams = {}): Observable<Repo[]> {
    const url = `${this.apiUrl}/orgs/${orgName}/repos`
    return this.http.get<Repo[]>(url, {
      headers: { Accept: 'application/vnd.github+json' },
      params: {
        type: 'public',
        sort: 'full_name',
        page: pagination?.page ?? 1,
        per_page: pagination?.rowsPerPage ?? 10,
      },
    })
  }
}
