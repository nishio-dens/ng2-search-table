import {
  Component, OnInit, ViewContainerRef,
  ComponentResolver, ViewChild, Compiler, EventEmitter
} from "@angular/core";
import {SearchTableService} from "../services/search-table.service";
import {NoHeaderComponent} from "./header/no-header.component";
import {NoFilterComponent} from "./table-filter/no-filter.component";

@Component({
  moduleId: module.id,
  selector: "search-table",
  inputs: [
    "tableClass",
    "columns",
    "config"
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
  @ViewChild("headerViewComponents", {read: ViewContainerRef}) headerViewComponents: any;
  @ViewChild("headerFilterComponents", {read: ViewContainerRef}) headerFilterComponents: any;

  tableClass: string;
  columns: any[];
  config: any = {};

  public dataRows: any[] = [];
  public headerComponents: any[] = [];
  private sortCondition: any = {};
  private filterConditions: any = {};

  private currentPage: number = 1;
  private pagePer: number = 20;
  private totalCount: number = 0;

  private debounceSearchEventEmitter: EventEmitter<any>;
  private debounceTime: number = 200; /* ms */

  private headerInstances: any = {};
  private filterInstances: any = {};
  private defaultValues: any = {};

  constructor(
    private componentResolver: ComponentResolver,
    private searchTableService: SearchTableService,
    private compiler: Compiler
  ) {}

  ngOnInit() {
    this.debounceSearchEventEmitter = new EventEmitter<any>();
    this.debounceSearchEventEmitter
      .debounceTime(this.debounceTime)
      .subscribe((_: any) => this.search());

    this.parseConfig(this.config);
    this.columns.forEach(header => {
      let headerComponent = header.headerComponent || NoHeaderComponent;
      this.compiler.compileComponentAsync(headerComponent).then((factory) => {
        let c: any = this.createHeaderTableComponent(factory, header, this.headerViewComponents);
        this.headerInstances[header.name] = c.instance;
      });

      let filterComponent = header.filterComponent || NoFilterComponent;
      this.compiler.compileComponentAsync(filterComponent).then((factory) => {
        let c: any = this.createFilterTableComponent(factory, header, this.headerFilterComponents);
        this.filterInstances[header.name] = c.instance;
      });
    });
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  getPagePer(): number {
    return this.pagePer;
  }

  getTotalCount(): number {
    return this.totalCount;
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
    this.search();
  }

  setPagePer(per: number): void {
    this.pagePer = per;
    this.setCurrentPage(1);
  }

  search(): void {
    let searchParams = {
      page: this.getCurrentPage(),
      per: this.getPagePer(),
      sort: this.sortCondition,
      filter: this.filterConditions
    };
    this
      .searchTableService
      .search(this.config.url, searchParams)
      .subscribe((r: any) => {
        this.setTotalCount(r.totalCount);
        this.dataRows = r.results;
      });
  }

  setSortDirection(name: string, direction: string): void {
    this.sortCondition = {};
    this.sortCondition[name] = direction;
    this.clearHeaderSortDirection(name);
  }

  setFilterValue(name: string, value: any, subComponentName?: string): void {
    let instance = this.filterInstances[name];
    if (instance) {
      if (subComponentName) {
        instance.setValue(subComponentName, value);
      } else {
        instance.setValue(name, value);
      }
    }
    this.defaultValues[name] = { value: value, subComponentName: subComponentName };
    this.resetCurrentPage();
  }

  private parseConfig(config: any): void {
    if (config.defaultPagePer) {
      this.pagePer = config.defaultPagePer;
    }
  }

  private setTotalCount(count: number): void {
    this.totalCount = count;
  }

  private resetCurrentPage(): void {
    this.currentPage = 1;
  }

  private createHeaderTableComponent(factory: any, header: any, viewComponents: any): any {
    let c: any = viewComponents.createComponent(factory);
    c.instance.name = header.name;
    c.instance.model = header.model;
    c.instance.eventEmitter.subscribe((v: any) => {
      this.setSortDirection(v.name, v.value);
      this.search();
    });
    if (this.sortCondition[header.name]) {
      c.instance.model.direction = this.sortCondition[header.name];
    }
    return c;
  }

  private createFilterTableComponent(factory: any, header: any, viewComponents: any): any {
    let c: any = viewComponents.createComponent(factory);
    c.instance.name = header.name;
    c.instance.model = header.model;
    c.instance.eventEmitter.subscribe((v: any) => {
      this.filterConditions[v.name] = v.value;
      this.resetCurrentPage();
      this.debounceSearchEventEmitter.emit(true);
    });
    let defaultValue: any = this.defaultValues[header.name];
    if (defaultValue) {
      if (defaultValue.subComponentName) {
        c.instance.setValue(defaultValue.subComponentName, defaultValue.value);
      } else {
        c.instance.setValue(header.name, defaultValue.value);
      }
    }
    return c;
  }

  private clearHeaderSortDirection(without?: string): void {
    if (this.columns) {
      this.columns.forEach((v: any) => {
        if (v.name !== without) {
          this.headerInstances[v.name].model.direction = "";
        }
      });
    }
  }
}
