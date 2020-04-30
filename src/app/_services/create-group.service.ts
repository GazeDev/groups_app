import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CreateGroupService {
    private subject = new Subject<any>();

    groupCreated() {
        this.subject.next();
    }

    getGroupCreatedUpdates(): Observable<any> {
        return this.subject.asObservable();
    }
}
