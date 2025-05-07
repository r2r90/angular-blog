import {Component, inject} from '@angular/core';
import {ProfileCardComponent} from '../../common-ui/profile-card/profile-card.component';
import {IProfile} from '../../data/interfaces/profile.interface';
import {ProfileService} from '../../data/services/profile.service';

@Component({
  selector: 'app-search-page',
  imports: [
    ProfileCardComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  profiles: IProfile[] = []
  profileService = inject(ProfileService);

  constructor() {
    this.profileService.getTestAccounts().subscribe(val => {
      console.log(val, 'SEARCH PAGE CONSTRUCTOR')
      this.profiles = val
    })
  }
}
