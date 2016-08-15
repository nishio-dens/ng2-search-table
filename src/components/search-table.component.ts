import {
  Component, OnInit, ViewContainerRef,
  ComponentResolver, ViewChild, Compiler
} from "@angular/core";
import {SimpleHeaderComponent} from "./header/simple-header.component";
import {SortableHeaderComponent} from "./header/sortable-header.component";
import {TableTextFilterComponent} from "./table-filter/table-text-filter.component";
import {SearchTableService} from "../services/search-table.service";

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

  constructor(
    private componentResolver: ComponentResolver,
    private searchTableService: SearchTableService,
    private compiler: Compiler
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
      this.compiler.compileComponentAsync(header.headerComponent).then((factory) => {
        let c: any = this.createHeaderTableComponent(factory, header, this.headerViewComponents);
        header.headerInstance = c.instance;
      });

      this.compiler.compileComponentAsync(header.filterComponent).then((factory) => {
        let c: any = this.createFilterTableComponent(factory, header, this.headerFilterComponents);
        header.filterInstance = c.instance;
      });
    });
  }

  ngAfterViewInit(): void {
    this.search();
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

  private setTotalCount(count: number): void {
    if (this.totalCount !== count) {
      this.currentPage = 1;
    }
    this.totalCount = count;
  }

  private createHeaderTableComponent(factory: any, header: any, viewComponents: any): any {
    let c: any = viewComponents.createComponent(factory);
    c.instance.name = header.name;
    c.instance.model = header.model;
    c.instance.eventEmitter.subscribe((v: any) => {
      this.sortCondition = {};
      this.sortCondition[v.name] = v.value;
      this.clearHeaderSortDirection(v.name);
      this.search();
    });
    return c;
  }

  private createFilterTableComponent(factory: any, header: any, viewComponents: any): any {
    let c: any = viewComponents.createComponent(factory);
    c.instance.name = header.name;
    c.instance.model = header.model;
    c.instance.eventEmitter.subscribe((v: any) => {
      this.filterConditions[v.name] = v.value;
      this.search();
    });
    return c;
  }

  private clearHeaderSortDirection(without?: string): void {
    this.headerComponents.forEach((v: any) => {
      if (v.name !== without) {
        v.headerInstance.model.direction = "";
      }
    });
  }

  private search(): void {
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
}
