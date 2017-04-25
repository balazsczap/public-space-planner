import { Directive, ElementRef, HostListener, Input, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[pspDragSlot]'
})
export class DragSlotDirective {
  constructor(private el: ElementRef) { }
  @Input("pspDragSlot") pspDragSlot: any;

  @Output() pspDropped: EventEmitter<any> = new EventEmitter();

  @HostListener('dragover', ["$event"]) 
  onDragOver(ev: DragEvent) {
    ev.preventDefault();
    
    
    // this.highlight("green");

  }
  @HostListener('drop',["$event"]) 
  onDrop(ev: DragEvent) {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("text"));
    
    this.pspDropped.emit(data);
  }

  @HostListener('dragenter', ["$event"]) 
  onDragEnter(ev: DragEvent) {
    ev.dataTransfer.dropEffect = "move";
    this.el.nativeElement.classList.add('gu-transit');
  }
  @HostListener('dragleave', ["$event"]) 
  onDragLeave(ev: DragEvent) {
    this.el.nativeElement.classList.remove('gu-transit');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}