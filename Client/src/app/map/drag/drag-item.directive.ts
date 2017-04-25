import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pspDragItem]',
  host:{
      "draggable":"true"
  }
})
export class DragItemDirective {
  constructor(private el: ElementRef) { 
  }

  @Input('pspDragItem') dragItem: any;

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {
    // event.preventDefault();
    // event.dataTransfer.setData("text", JSON.stringify(this.DragItem));
    // console.log(event);
    event.dataTransfer.effectAllowed="move";
    var parent = this.el.nativeElement.parentNode;
    var dto = {
      parent: {x:+parent.getAttribute('x_pos'), y:+parent.getAttribute('y_pos')},
      item: this.dragItem
      
    }
    this.el.nativeElement.style.cursor="-webkit-grabbing";
    
    event.dataTransfer.setData("text", JSON.stringify(dto));
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event: DragEvent){
    event.preventDefault();
    // this.el.nativeElement.classList.remove()
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}