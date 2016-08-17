import {
  Component, Input, Output,
  OnChanges, EventEmitter, HostBinding
} from "@angular/core";
import {TableHeader} from "./table-header";

@Component({
  moduleId: module.id,
  selector: "th[no-header]",
  inputs: ["name", "model"],
  outputs: ["eventEmitter"],
  template: `
  `
})

export class NoHeaderComponent implements TableHeader {
  name: string;
  model: any = {};
  eventEmitter: any = new EventEmitter();

  @HostBinding("hidden") isHidden: boolean = false;

  setVisibility(visible: boolean): void {
    this.isHidden = !visible;
  }
}
