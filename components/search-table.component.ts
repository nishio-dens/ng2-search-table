import {
  Component, OnInit, ViewContainerRef,
  ComponentResolver, ViewChild, Compiler
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

  constructor(
    private componentResolver: ComponentResolver,
    private searchTableService: SearchTableService,
    private compiler: Compiler
  ) {}

  ngOnInit() {
    this.columns.forEach(header => {
      let headerComponent = header.headerComponent || NoHeaderComponent;
      this.compiler.compileComponentAsync(headerComponent).then((factory) => {
        let c: any = this.createHeaderTableComponent(factory, header, this.headerViewComponents);
        header.headerInstance = c.instance;
      });

      let filterComponent = header.filterComponent || NoFilterComponent;
      this.compiler.compileComponentAsync(filterComponent).then((factory) => {
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
      this.currentPage = 1;
      this.search();
    });
    return c;
  }

  private clearHeaderSortDirection(without?: string): void {
    this.columns.forEach((v: any) => {
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
