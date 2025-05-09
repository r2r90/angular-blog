import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProfile} from '../interfaces/profile.interface';
import {IPageble} from '../interfaces/pageble.interface';
import {map, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  me = signal<IProfile | null>(null);
  filteredProfiles = signal<IProfile[] | null>([]);


  getTestAccounts() {
    return this.http.get<IProfile[]>(`${this.baseApiUrl}account/test_accounts`)
  }

  getMe() {
    return this.http.get<IProfile>(`${this.baseApiUrl}account/me`)
      .pipe(
        tap(res => this.me.set(res)),
      )
  }

  getSubscribersShortList(count: number) {
    return this.http.get<IPageble<IProfile>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(
        map(res => res.items.slice(0, count))
      )
  }

  getUserById(id: string): Observable<IProfile> {
    return this.http.get<IProfile>(`${this.baseApiUrl}account/${id}`)
  }

  patchProfile(profile: Partial<IProfile>) {
    return this.http.patch<IProfile>(`${this.baseApiUrl}account/me`, profile)
  }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<IProfile>(`${this.baseApiUrl}account/upload_image`, formData)
  }

  filterProfiles(params: Record<string, any>) {
    console.log(params);

    return this.http.get<IPageble<IProfile>>(`${this.baseApiUrl}account/accounts`,
      {
        params
      }
    ).pipe(
      tap(res => this.filteredProfiles.set(res.items))
    )
  }
}
