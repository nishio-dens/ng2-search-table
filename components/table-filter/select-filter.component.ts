import {Component, EventEmitter, HostBinding} from "@angular/core";
import {FormControl} from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: "th[select-filter]",
  inputs: ["name", "model"],
  outputs: ["eventEmitter"],
  template: `
  <select class="form-control"
          [formControl]="selectControl">
    <option *ngFor="let cond of model.selectValues" value="{{cond.id}}">
      {{cond.name}}
    </option>
  </select>
  `
})

export class SelectFilterComponent {
  name: string;
  model: any = {};
  eventEmitter: any = new EventEmitter();

  @HostBinding("hidden") isHidden: boolean = false;

  selectControl: FormControl;

  ngOnInit() {
    this.selectControl = new FormControl();
    this.selectControl.valueChanges.subscribe((v: any) => {
      if(this.selectControl.dirty) {
        let newValue = v;
        this.eventEmitter.emit({
          value: newValue,
          model: this.model,
          name: this.name
        });
      }
    });
  }

  reset(): void {
  }
}
