import {Component, EventEmitter, HostBinding} from "@angular/core";
import {FormControl} from "@angular/forms";

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

export class FromToTextFilterComponent {
  name: string;
  model: any = {};
  debounceMillSeconds: number = 300;
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

  reset(): void {
    this.fromTerm = "";
    this.toTerm = "";
  }

  private setValueChangeEmitter(control: FormControl, controlName: string) {
    control.valueChanges.debounceTime(this.debounceMillSeconds).subscribe(newValue => {
      if (control.dirty) {
        let newValue = control === this.termFromControl ? this.fromTerm : this.toTerm;
        this.eventEmitter.emit({
          value: newValue,
          model: this.model,
          name: controlName
        });
      }
    });
  }
}
