import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[drag-drop]'
})
export class DragDropDirective {

  @Output() fileDrop = new EventEmitter<File>();


  @HostBinding('class.dragover')
  fileOver = false

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();

    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();

    this.fileOver = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.fileOver = false;

    this.fileDrop.emit(event.dataTransfer?.files[0]);
  }

}
