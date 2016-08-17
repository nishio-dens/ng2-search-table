import {Component, EventEmitter, HostBinding} from "@angular/core";
import {FormControl} from "@angular/forms";
import {TableFilter} from "./table-filter";

@Component({
  moduleId: module.id,
  selector: "th[from-to-text-filter]",
  inputs: ["name", "model", "debounceMillSeconds"],
  outputs: ["eventEmitter"],
  template: `
    <div class="row">
      <div class="col-xs-6">
        <input class="form-control input-sm"
               [formControl]="termFromControl"
               [(ngModel)]="fromTerm"
               placeholder="{{model.multipleFilter[0].placeholder}}" />
      </div>
      <div class="col-xs-6">
        <input class="form-control input-sm"
               [formControl]="termToControl"
               [(ngModel)]="toTerm"
               placeholder="{{model.multipleFilter[1].placeholder}}"/>
      </div>
    </div>
  `
})

export class FromToTextFilterComponent implements TableFilter {
  name: string;
  model: any = {};
  eventEmitter: any = new EventEmitter();

  @HostBinding("hidden") isHidden: boolean = false;

  fromTerm: string;
  toTerm: string;
  termFromControl: FormControl;
  termToControl: FormControl;

  ngOnInit() {
    this.termFromControl = new FormControl();
    this.termToControl = new FormControl();

    this.setValueChangeEmitter(
      this.termFromControl,
      this.model.multipleFilter[0].name
    );
    this.setValueChangeEmitter(
      this.termToControl,
      this.model.multipleFilter[1].name
    );
  }

  setValue(name: string, value: any): void {
    if (this.model.multipleFilter[0].name === name) {
      this.fromTerm = value;
    } else if (this.model.multipleFilter[1].name === name) {
      this.toTerm = value;
    }
  }

  private setValueChangeEmitter(control: FormControl, controlName: string) {
    control.valueChanges.subscribe(newValue => {
      let value = (control === this.termFromControl ? this.fromTerm : this.toTerm) || "";
      this.eventEmitter.emit({
        value: value,
        model: this.model,
        name: controlName
      });
    });
  }
}
