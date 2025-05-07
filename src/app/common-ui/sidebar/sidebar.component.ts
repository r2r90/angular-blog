import {Component, inject} from '@angular/core';
import {SvgIconComponent} from '../svg-icon/svg-icon.component';
import {AsyncPipe, JsonPipe, NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {SubscriberCardComponent} from '../subscriber-card/subscriber-card.component';
import {ProfileService} from '../../data/services/profile.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    SvgIconComponent,
    NgForOf,
    RouterLink,
    SubscriberCardComponent,
    AsyncPipe,
    JsonPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  profileService: ProfileService = inject(ProfileService);

  subscribers$ = this.profileService.getSubscribersShortList()

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
}
