import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public visible = false;

  constructor() {
    this.visible = true;
  }

  ngOnInit() {
  }

  

}
