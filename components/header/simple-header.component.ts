import {Component, Input, Output, OnChanges, EventEmitter, HostBinding} from "@angular/core";
import {TableHeader} from "./table-header";

@Component({
  moduleId: module.id,
  selector: "th[simple-header]",
  inputs: ["name", "model"],
  outputs: ["eventEmitter"],
  template: `
    {{model.displayName}}
  `
})

export class SimpleHeaderComponent implements TableHeader {
  name: string;
  model: any = {};
  eventEmitter: any = new EventEmitter();

  @HostBinding("hidden") isHidden: boolean = false;

  setVisibility(visible: boolean): void {
    this.isHidden = !visible;
  }
}
