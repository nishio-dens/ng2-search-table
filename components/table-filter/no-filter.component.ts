import {Component, EventEmitter, HostBinding} from "@angular/core";
import {FormControl} from "@angular/forms";
import {TableFilter} from "./table-filter";

@Component({
  moduleId: module.id,
  selector: "th[no-filter]",
  inputs: ["name", "model"],
  outputs: ["eventEmitter"],
  template: `
  `
})

export class NoFilterComponent implements TableFilter {
  name: string;
  model: any = {};
  eventEmitter: any = new EventEmitter();

  @HostBinding("hidden") isHidden: boolean = false;

  setValue(name: string, value: any): void {
    // nothing
  }

  setVisibility(visible: boolean): void {
    this.isHidden = !visible;
  }
}
