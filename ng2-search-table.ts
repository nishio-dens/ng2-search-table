import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Http, HttpModule} from "@angular/http";
import {SearchTableComponent} from "./src/search-table.component";

@NgModule({
  imports: [CommonModule],
  declarations: [
    SearchTableComponent
  ],
  exports: [
    SearchTableComponent
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
