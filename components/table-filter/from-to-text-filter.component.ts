import {Component, EventEmitter, HostBinding} from "@angular/core";
import {FormControl} from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: "th[from-to-text-filter]",
  inputs: ["name", "model", "debounceMillSeconds"],
  outputs: ["eventEmitter"],
  template: `
    <input class="form-control input-sm" [formControl]="termFromControl" [(ngModel)]="term" />
    <input class="form-control input-sm" [formControl]="termToControl" [(ngModel)]="term" />
  `
})

export class FromToTextFilter {
  name: string;
  model: any = {};
  debounceMillSeconds: number = 300;
  eventEmitter: any = new EventEmitter();

  @HostBinding("hidden") isHidden: boolean = false;

  term: string;
  termControl: FormControl;

  ngOnInit() {
    this.termControl = new FormControl();
    this.termControl.valueChanges.debounceTime(this.debounceMillSeconds).subscribe(newValue => {
      if (this.termControl.dirty) {
        this.eventEmitter.emit({
          value: newValue,
          model: this.model,
          name: this.name
        });
      }
    });
  }

  reset(): void {
    this.term = "";
  }
}
