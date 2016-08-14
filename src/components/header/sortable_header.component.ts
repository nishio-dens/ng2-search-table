import {Component, Input, Output, OnChanges, EventEmitter, HostBinding} from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'th[simple-sortable-header]',
  inputs: ['name', 'model'],
  outputs: ['eventEmitter'],
  host: {
    '(click)': 'emitSomeEvent()'
  },
  template: `
    {{model.displayName}}
  `
})

export class SortableHeaderComponent {
  name: string;
  model: any = {};
  eventEmitter: any = new EventEmitter();

  @HostBinding("hidden") isHidden: boolean = false;

  ngOnInit() {
  }

  public emitSomeEvent() {
    this.eventEmitter.emit("Something" + this.name);
  }
}
