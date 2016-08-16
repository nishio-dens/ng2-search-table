import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import "rxjs/Rx";

import {SearchTableComponent} from "./components/search-table.component";
import {NoHeaderComponent} from "./components/header/no-header.component";
import {SimpleHeaderComponent} from "./components/header/simple-header.component";
import {SortableHeaderComponent} from "./components/header/sortable-header.component";
import {NoFilterComponent} from "./components/table-filter/no-filter.component";
import {TableTextFilterComponent} from "./components/table-filter/table-text-filter.component";
import {SearchTableService} from "./services/search-table.service";

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SearchTableComponent,
    // Header
    NoHeaderComponent,
    SimpleHeaderComponent,
    SortableHeaderComponent,
    // Filter
    NoFilterComponent,
    TableTextFilterComponent,
  ],
  providers: [
    SearchTableService
  ],
  exports: [
    SearchTableComponent,
    // Header
    NoHeaderComponent,
    SimpleHeaderComponent,
    SortableHeaderComponent,
    // Filter
    NoFilterComponent,
    TableTextFilterComponent,
  ]
})
export class Ng2SearchTableModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ng2SearchTableModule,
      providers: []
    };
  }
}
