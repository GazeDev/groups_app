import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JoinGroupService {
    private subject = new Subject<any>();

    groupJoined() {
        this.subject.next();
    }

    getGroupsJoinedUpdates(): Observable<any> {
        return this.subject.asObservable();
    }
}
