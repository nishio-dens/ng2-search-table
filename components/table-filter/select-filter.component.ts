import {Component, EventEmitter, HostBinding} from "@angular/core";
import {FormControl} from "@angular/forms";
import {TableFilter} from "./table-filter";

@Component({
  moduleId: module.id,
  selector: "th[select-filter]",
  inputs: ["name", "model"],
  outputs: ["eventEmitter"],
  template: `
  <select class="form-control input-sm"
          [formControl]="selectControl" [(ngModel)]="selectValue">
    <option *ngFor="let cond of model.selectValues" value="{{cond.id}}">
      {{cond.name}}
    </option>
  </select>
  `
})

export class SelectFilterComponent implements TableFilter {
  name: string;
  model: any = {};
  eventEmitter: any = new EventEmitter();
  selectValue: any;

  @HostBinding("hidden") isHidden: boolean = false;

  selectControl: FormControl;

  ngOnInit() {
    this.selectControl = new FormControl();
    this.selectControl.valueChanges.subscribe((v: any) => {
      let newValue = v || "";
      this.eventEmitter.emit({
        value: newValue,
        model: this.model,
        name: this.name
      });
    });
  }

  setValue(name: string, value: any): void {
    this.selectValue = value;
  }

  setVisibility(visible: boolean): void {
    this.isHidden = !visible;
  }
}
