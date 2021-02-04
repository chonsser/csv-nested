import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-entry',
  templateUrl: './list-entry.component.html',
  styleUrls: ['./list-entry.component.css']
})
export class ListEntryComponent implements OnInit {
  @Input() element: { title: string, children: [] };
  @Input() prefix = '';
  collapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

  collapse($event): void {
    $event.stopPropagation()
    this.collapsed = !this.collapsed;
  }
}
