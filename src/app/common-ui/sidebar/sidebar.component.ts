import {Component, inject} from '@angular/core';
import {SvgIconComponent} from '../svg-icon/svg-icon.component';
import {AsyncPipe, JsonPipe, NgForOf, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {SubscriberCardComponent} from '../subscriber-card/subscriber-card.component';
import {ProfileService} from '../../data/services/profile.service';
import {firstValueFrom} from 'rxjs';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-sidebar',
  imports: [
    SvgIconComponent,
    NgForOf,
    RouterLink,
    SubscriberCardComponent,
    AsyncPipe,
    ImgUrlPipe,
    NgOptimizedImage,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  profileService: ProfileService = inject(ProfileService);

  subscribers$ = this.profileService.getSubscribersShortList()
  me = this.profileService.me

  menuItems = [
    {
      label: 'My Page',
      icon: 'home',
      link: '',
    },
    {
      label: 'Chats',
      icon: 'chat',
      link: 'chats',
    },
    {
      label: 'Search',
      icon: 'search',
      link: 'search',
    },
  ]

  ngOnInit(): void {
    firstValueFrom(this.profileService.getMe())
  }
}
