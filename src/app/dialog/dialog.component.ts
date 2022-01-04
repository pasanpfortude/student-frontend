import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input() opened: boolean;
  @Output() actionEvent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  

  public close(status: boolean) {
    this.opened = false;
    if(status)
      this.actionEvent.emit(true);
    else
      this.actionEvent.emit(false);
  }

}
