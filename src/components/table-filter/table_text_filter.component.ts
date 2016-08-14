import {Component, EventEmitter, HostBinding} from "@angular/core";
import {FormControl} from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: 'th[table-text-filter]',
  inputs: ['name', 'model', 'debounceMillSeconds'],
  outputs: ['eventEmitter'],
  template: `
    <input class="form-control input-sm" [formControl]="termControl" [(ngModel)]="term" />
  `
})

export class TableTextFilterComponent {
  name: string;
  model: any = {};
  debounceMillSeconds: number = 200;
  eventEmitter: any = new EventEmitter();

  @HostBinding("hidden") isHidden: boolean = false;

  term: string;
  termControl: FormControl;

  ngOnInit() {
    this.termControl = new FormControl();
    this.termControl.valueChanges.debounceTime(this.debounceMillSeconds).subscribe(newValue => {
      if(this.termControl.dirty) {
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
