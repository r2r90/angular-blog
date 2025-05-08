import {Component, inject} from '@angular/core';
import {ProfileHeaderComponent} from '../../profile-header/profile-header.component';
import {ProfileService} from '../../data/services/profile.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {switchMap} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {AsyncPipe} from '@angular/common';
import {SvgIconComponent} from '../../common-ui/svg-icon/svg-icon.component';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';
import {PostFeedComponent} from './post-feed/post-feed.component';

@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    SvgIconComponent,
    ImgUrlPipe,
    RouterLink,
    PostFeedComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  profileService: ProfileService = inject(ProfileService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);


  subscribers$ = this.profileService.getSubscribersShortList(5)
  me$ = toObservable(this.profileService.me)

  profile$ = this.activatedRoute.params
    .pipe(
      switchMap(({id}) => {
        if (id === 'me') return this.me$
        return this.profileService.getUserById(id)
      })
    )
}
