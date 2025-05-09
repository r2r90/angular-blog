import {Component, inject} from '@angular/core';
import {ProfileCardComponent} from '../../common-ui/profile-card/profile-card.component';
import {IProfile} from '../../data/interfaces/profile.interface';
import {ProfileService} from '../../data/services/profile.service';
import {ProfileFiltersComponent} from './profile-filters/profile-filters.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-search-page',
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent,
    AsyncPipe
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  profileService = inject(ProfileService);

  profiles = this.profileService.filteredProfiles

  constructor() {

    // this.profileService.getTestAccounts().subscribe(val => {
    //   this.profiles = val
    // })
  }
}
