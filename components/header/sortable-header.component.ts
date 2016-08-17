import {Component, Input, Output, OnChanges, EventEmitter, HostBinding} from "@angular/core";
import {TableHeader} from "./table-header";

@Component({
  moduleId: module.id,
  selector: "th[simple-sortable-header]",
  inputs: ["name", "model"],
  outputs: ["eventEmitter"],
  host: {
    "(click)": "onToggleSort()"
  },
  template: `
    {{model.displayName}}
    <i class="pull-right fa"
    [ngClass]="{'fa-sort': (model.direction != 'asc' && model.direction != 'desc'),
      'fa-sort-asc': model.direction == 'asc',
      'fa-sort-desc': model.direction == 'desc'}"
    aria-hidden='true'></i>
  `
})

export class SortableHeaderComponent implements TableHeader {
  name: string;
  model: any = {};
  eventEmitter: any = new EventEmitter();

  @HostBinding("hidden") isHidden: boolean = false;
  @HostBinding("class.sort-asc") get asc() { return this.model.direction === "asc"; }
  @HostBinding("class.sort-desc") get desc() { return this.model.direction === "desc"; }

  public onToggleSort() {
    switch (this.model.direction) {
      case "asc":
        this.model.direction = "desc";
        break;
      case "desc":
        this.model.direction = "asc";
        break;
      default:
        this.model.direction = "asc";
        break;
    }

    this.eventEmitter.emit({
      value: this.model.direction,
      model: this.model,
      name: this.name
    });
  }

  setVisibility(visible: boolean): void {
    this.isHidden = !visible;
  }
}
