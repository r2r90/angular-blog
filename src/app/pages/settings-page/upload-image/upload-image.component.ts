import {Component, signal} from '@angular/core';
import {SvgIconComponent} from '../../../common-ui/svg-icon/svg-icon.component';
import {DragDropDirective} from '../../../common-ui/directives/drag-drop.directive';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-upload-image',
  imports: [
    SvgIconComponent,
    DragDropDirective,
    FormsModule
  ],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss'
})


export class UploadImageComponent {
  preview = signal<string>('/assets/images/avatar-placeholder.png')
  avatar: File | null = null

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0]
    this.processFile(file);
  }


  onFileDropped(file: File) {
    this.processFile(file);
  }

  processFile(file: File | null | undefined) {

    if (!file || !file.type.match('image')) return

    const reader = new FileReader();
    reader.onload = event => {
      this.preview.set(event.target?.result?.toString() ?? '')
    }
    reader.readAsDataURL(file);
    this.avatar = file
  }


}
