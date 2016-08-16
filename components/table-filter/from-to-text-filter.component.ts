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
        <input class="form-control input-sm" [formControl]="termFromControl" [(ngModel)]="fromTerm" />
      </div>
      <div class="col-xs-6">
        <input class="form-control input-sm" [formControl]="termToControl" [(ngModel)]="toTerm" />
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

    // this.termControl.valueChanges.debounceTime(this.debounceMillSeconds).subscribe(newValue => {
    //   if (this.termControl.dirty) {
    //     this.eventEmitter.emit({
    //       value: newValue,
    //       model: this.model,
    //       name: this.name
    //     });
    //   }
    // });
  }

  reset(): void {
    this.fromTerm = "";
    this.toTerm = "";
  }
}
