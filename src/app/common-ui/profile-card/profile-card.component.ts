import {Component, Input} from '@angular/core';
import {IProfile} from '../../data/interfaces/profile.interface';
import {NgOptimizedImage} from '@angular/common';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-profile-card',
  imports: [
    NgOptimizedImage,
    ImgUrlPipe
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input() profile!: IProfile;

}
