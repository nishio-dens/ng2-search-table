import {
  Component, Input, Output,
  OnChanges, EventEmitter, HostBinding
} from "@angular/core";

@Component({
  moduleId: module.id,
  selector: "th[no-header]",
  inputs: ["name", "model"],
  outputs: ["eventEmitter"],
  template: `
  `
})

export class NoHeaderComponent {
  name: string;
  model: any = {};
  eventEmitter: any = new EventEmitter();

  @HostBinding("hidden") isHidden: boolean = false;
}
