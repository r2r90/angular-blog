import {Component, input} from '@angular/core';
import {IProfile} from '../data/interfaces/profile.interface';
import {NgOptimizedImage} from '@angular/common';
import {ImgUrlPipe} from '../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-profile-header',
  imports: [
    NgOptimizedImage,
    ImgUrlPipe
  ],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  profile = input<IProfile>()
}
