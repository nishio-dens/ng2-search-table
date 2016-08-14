import {
  Component, OnInit, ViewContainerRef,
  ComponentResolver, ViewChild
} from "@angular/core";
import {SimpleHeaderComponent} from "./header/simple_header.component";
import {SortableHeaderComponent} from "./header/sortable_header.component";
import {TableTextFilterComponent} from "./table-filter/table_text_filter.component";
import {URLSearchParams} from "@angular/http";
import {SearchTableService} from "../services/search-table.service";

@Component({
  moduleId: module.id,
  selector: "search-table",
  inputs: [
    'tableClass',
    'columns',
    'config'
  ],
  template: `
  <table [ngClass]="tableClass">
    <thead>
      <tr>
        <template #headerViewComponents></template>
      </tr>
      <tr>
        <template #headerFilterComponents></template>
      </tr>
    </thead>
    <ng-content></ng-content>
  </table>
  `
})

export class SearchTableComponent implements OnInit {
  @ViewChild('headerViewComponents', {read: ViewContainerRef}) headerViewComponents: any;
  @ViewChild('headerFilterComponents', {read: ViewContainerRef}) headerFilterComponents: any;

  tableClass: string;
  columns: any[];
  config: any = {};

  public dataRows: any[] = [];
  public headerComponents: any[] = [];
  private filterConditions: any = {};

  constructor(
    private componentResolver: ComponentResolver,
    private searchTableService: SearchTableService
  ) {}

  ngOnInit() {
    this.headerComponents = [
      {
        name: "id",
        model: {displayName: "Id"},
        headerComponent: SortableHeaderComponent,
        filterComponent: TableTextFilterComponent,
        headerInstance: null,
        filterInstance: null
      },
      {
        name: "name",
        model: {displayName: "Name"},
        headerComponent: SortableHeaderComponent,
        filterComponent: TableTextFilterComponent,
        headerInstance: null,
        filterInstance: null
      },
      {
        name: "price",
        model: {displayName: "Price"},
        headerComponent: SimpleHeaderComponent,
        filterComponent: TableTextFilterComponent,
        headerInstance: null,
        filterInstance: null
      },
    ];

    this.headerComponents.forEach(header => {
      this.componentResolver.resolveComponent(header.headerComponent).then((factory) => {
        let c: any = this.createTableComponent(factory, header, this.headerViewComponents);
        header.headerInstance = c.instance;
      });

      this.componentResolver.resolveComponent(header.filterComponent).then((factory) => {
        let c: any = this.createTableComponent(factory, header, this.headerFilterComponents);
        header.filterInstance = c.instance;
      });
    });
  }

  public dummyEvent() : void {
    let searchParams: URLSearchParams = new URLSearchParams();
    searchParams.set("page", "1");
    searchParams.set("per", "20");

    console.log(this.dataRows);
    console.log(this.config);
    this.dataRows = [
      {id: 1},
      {id: 2},
    ];
  }

  private createTableComponent(factory: any, header: any, viewComponents: any) : any {
    let c: any = viewComponents.createComponent(factory);
    c.instance.name = header.name;
    c.instance.model = header.model;
    c.instance.eventEmitter.subscribe((v: any) => {
      this.filterConditions[v.name] = v.value;
      this.searchTableService.search(this.config.url);
    });
    return c;
  }
}
