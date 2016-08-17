import {Component, EventEmitter, HostBinding} from "@angular/core";
import {FormControl} from "@angular/forms";
import {TableFilter} from "./table-filter";

@Component({
  moduleId: module.id,
  selector: "th[text-filter]",
  inputs: ["name", "model", "debounceMillSeconds"],
  outputs: ["eventEmitter"],
  template: `
    <input class="form-control input-sm" [formControl]="termControl" [(ngModel)]="term" />
  `
})

export class TextFilterComponent implements TableFilter {
  name: string;
  model: any = {};
  debounceMillSeconds: number = 300;
  eventEmitter: any = new EventEmitter();

  @HostBinding("hidden") isHidden: boolean = false;

  term: string;
  termControl: FormControl;

  ngOnInit() {
    this.termControl = new FormControl();
    this.termControl.valueChanges.subscribe(newValue => {
      let value = newValue || "";
      this.eventEmitter.emit({
        value: value,
        model: this.model,
        name: this.name
      });
    });
  }

  setValue(name: string, value: any): void {
    this.term = value;
  }
}
