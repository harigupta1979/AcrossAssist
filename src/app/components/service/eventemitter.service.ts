import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventEmitterService {
  private refreshListSubject = new Subject<void>();
  refreshList$ = this.refreshListSubject.asObservable();

  private refreshuserListSubject = new Subject<void>();
  refreshuserList$ = this.refreshuserListSubject.asObservable();

  private submitpermissionSubject = new Subject<void>();
  savepermission$ = this.submitpermissionSubject.asObservable();
  triggerRefresh() {
    this.refreshListSubject.next();
  }
  triggerUserRefresh() {
    this.refreshuserListSubject.next();
  }
  triggersavepermission() {
    this.submitpermissionSubject.next();
  }
}
