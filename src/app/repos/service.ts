import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

import { Repo } from '@app/repos/mode'

@Injectable()
export class RepoService {
  getRepos(orgName: string): Observable<Repo[]> {
    return of([])
  }
}
