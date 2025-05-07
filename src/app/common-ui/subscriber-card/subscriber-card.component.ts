import {Component, Input} from '@angular/core';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';
import {IProfile} from '../../data/interfaces/profile.interface';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-subscriber-card',
  imports: [
    ImgUrlPipe,
    NgOptimizedImage
  ],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss'
})
export class SubscriberCardComponent {
  @Input() profile!: IProfile
  constructor() {
  }
}
