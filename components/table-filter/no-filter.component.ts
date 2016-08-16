import {Component, EventEmitter, HostBinding} from "@angular/core";
import {FormControl} from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: "th[no-filter]",
  inputs: ["name", "model"],
  outputs: ["eventEmitter"],
  template: `
  `
})

export class NoFilterComponent {
  name: string;
  model: any = {};
  eventEmitter: any = new EventEmitter();
}
