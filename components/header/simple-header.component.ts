import {Component, Input, Output, OnChanges, EventEmitter, HostBinding} from "@angular/core";

@Component({
  moduleId: module.id,
  selector: "th[simple-header]",
  inputs: ["name", "model"],
  outputs: ["eventEmitter"],
  template: `
    {{model.displayName}}
  `
})

export class SimpleHeaderComponent {
  name: string;
  model: any = {};
  eventEmitter: any = new EventEmitter();

  @HostBinding("hidden") isHidden: boolean = false;

  ngOnInit() {
  }
}
