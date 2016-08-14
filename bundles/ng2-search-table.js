System.registerDynamic("src/search-table.component", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var SearchTableComponent = (function() {
    function SearchTableComponent() {}
    SearchTableComponent = __decorate([core_1.Component({
      selector: "search-table",
      inputs: ['tableClass', 'columns'],
      template: "\n    <h1>Hello Table Component</h1>\n  "
    }), __metadata('design:paramtypes', [])], SearchTableComponent);
    return SearchTableComponent;
  }());
  exports.SearchTableComponent = SearchTableComponent;
  return module.exports;
});

System.registerDynamic("ng2-search-table", ["@angular/core", "@angular/common", "./src/search-table.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var search_table_component_1 = $__require('./src/search-table.component');
  var Ng2SearchTableModule = (function() {
    function Ng2SearchTableModule() {}
    Ng2SearchTableModule.forRoot = function() {
      return {
        ngModule: Ng2SearchTableModule,
        providers: []
      };
    };
    Ng2SearchTableModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule],
      declarations: [search_table_component_1.SearchTableComponent],
      exports: [search_table_component_1.SearchTableComponent]
    }), __metadata('design:paramtypes', [])], Ng2SearchTableModule);
    return Ng2SearchTableModule;
  }());
  exports.Ng2SearchTableModule = Ng2SearchTableModule;
  return module.exports;
});
