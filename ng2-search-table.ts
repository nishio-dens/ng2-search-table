import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import "rxjs/Rx";

import {SearchTableComponent} from "./src/components/search-table.component";
import {SimpleHeaderComponent} from "./src/components/header/simple-header.component";
import {SortableHeaderComponent} from "./src/components/header/sortable-header.component";
import {TableTextFilterComponent} from "./src/components/table-filter/table-text-filter.component";
import {SearchTableService} from "./src/services/search-table.service";

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
    SimpleHeaderComponent,
    SortableHeaderComponent,
    TableTextFilterComponent,
  ],
  providers: [
    SearchTableService
  ],
  exports: [
    SearchTableComponent,
    SimpleHeaderComponent,
    SortableHeaderComponent,
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
