import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.scss']
})
export class MyDialogComponent implements OnInit {

  @Input() message: string;
  @Output() closeModal = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }


  onClose() {
    this.closeModal.emit();
  }
}
