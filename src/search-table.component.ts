import {
  Component, Input, Output, ElementRef, OnInit, Injector, ViewContainerRef,
  ComponentResolver, ViewChild
} from "@angular/core";

@Component({
  selector: "search-table",
  inputs: [
    'tableClass',
    'columns'
  ],
  template: `
    <h1>Hello Table Component</h1>
  `
})

export class SearchTableComponent {
}
