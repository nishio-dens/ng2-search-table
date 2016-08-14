System.registerDynamic("src/search-table.component", ["@angular/core", "./components/header/simple_header.component", "./components/header/sortable_header.component", "./components/table-filter/table_text_filter.component"], true, function($__require, exports, module) {
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
  var simple_header_component_1 = $__require('./components/header/simple_header.component');
  var sortable_header_component_1 = $__require('./components/header/sortable_header.component');
  var table_text_filter_component_1 = $__require('./components/table-filter/table_text_filter.component');
  var SearchTableComponent = (function() {
    function SearchTableComponent(componentResolver) {
      this.componentResolver = componentResolver;
      this.config = {};
      this.dataRows = [];
      this.headerComponents = [];
    }
    SearchTableComponent.prototype.ngOnInit = function() {
      var _this = this;
      this.headerComponents = [{
        id: 1,
        model: {name: "Test"},
        headerComponent: sortable_header_component_1.SortableHeaderComponent,
        filterComponent: table_text_filter_component_1.TableTextFilterComponent,
        headerInstance: null,
        filterInstance: null
      }, {
        id: 2,
        model: {name: "Test2"},
        headerComponent: sortable_header_component_1.SortableHeaderComponent,
        filterComponent: table_text_filter_component_1.TableTextFilterComponent,
        headerInstance: null,
        filterInstance: null
      }, {
        id: 3,
        model: {name: "Test3"},
        headerComponent: simple_header_component_1.SimpleHeaderComponent,
        filterComponent: table_text_filter_component_1.TableTextFilterComponent,
        headerInstance: null,
        filterInstance: null
      }];
      this.headerComponents.forEach(function(header) {
        _this.componentResolver.resolveComponent(header.headerComponent).then(function(factory) {
          var c = _this.createTableComponent(factory, header, _this.headerViewComponents);
          header.headerInstance = c.instance;
        });
        _this.componentResolver.resolveComponent(header.filterComponent).then(function(factory) {
          var c = _this.createTableComponent(factory, header, _this.headerFilterComponents);
          header.filterInstance = c.instance;
        });
      });
    };
    SearchTableComponent.prototype.dummyEvent = function() {
      console.log(this.dataRows);
      console.log(this.config);
      this.dataRows = [{id: 1}, {id: 2}];
    };
    SearchTableComponent.prototype.createTableComponent = function(factory, header, viewComponents) {
      var c = viewComponents.createComponent(factory);
      c.instance.id = header.id;
      c.instance.model = header.model;
      c.instance.eventEmitter.subscribe(function(v) {
        console.log("Event Receive " + JSON.stringify(v));
      });
      return c;
    };
    __decorate([core_1.ViewChild('headerViewComponents', {read: core_1.ViewContainerRef}), __metadata('design:type', Object)], SearchTableComponent.prototype, "headerViewComponents", void 0);
    __decorate([core_1.ViewChild('headerFilterComponents', {read: core_1.ViewContainerRef}), __metadata('design:type', Object)], SearchTableComponent.prototype, "headerFilterComponents", void 0);
    SearchTableComponent = __decorate([core_1.Component({
      moduleId: module.id,
      selector: "search-table",
      inputs: ['tableClass', 'columns', 'config'],
      template: "\n  <table [ngClass]=\"tableClass\">\n    <thead>\n      <tr>\n        <template #headerViewComponents></template>\n      </tr>\n      <tr>\n        <template #headerFilterComponents></template>\n      </tr>\n    </thead>\n    <ng-content></ng-content>\n  </table>\n  "
    }), __metadata('design:paramtypes', [core_1.ComponentResolver])], SearchTableComponent);
    return SearchTableComponent;
  }());
  exports.SearchTableComponent = SearchTableComponent;
  return module.exports;
});

System.registerDynamic("src/components/header/simple_header.component", ["@angular/core"], true, function($__require, exports, module) {
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
  var SimpleHeaderComponent = (function() {
    function SimpleHeaderComponent() {
      this.model = {};
      this.eventEmitter = new core_1.EventEmitter();
      this.isHidden = false;
    }
    SimpleHeaderComponent.prototype.ngOnInit = function() {};
    __decorate([core_1.HostBinding("hidden"), __metadata('design:type', Boolean)], SimpleHeaderComponent.prototype, "isHidden", void 0);
    SimpleHeaderComponent = __decorate([core_1.Component({
      moduleId: module.id,
      selector: 'th[simple-header]',
      inputs: ['id', 'model'],
      outputs: ['eventEmitter'],
      template: "\n    {{model.name}}\n  "
    }), __metadata('design:paramtypes', [])], SimpleHeaderComponent);
    return SimpleHeaderComponent;
  }());
  exports.SimpleHeaderComponent = SimpleHeaderComponent;
  return module.exports;
});

System.registerDynamic("src/components/header/sortable_header.component", ["@angular/core"], true, function($__require, exports, module) {
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
  var SortableHeaderComponent = (function() {
    function SortableHeaderComponent() {
      this.model = {};
      this.eventEmitter = new core_1.EventEmitter();
      this.isHidden = false;
    }
    SortableHeaderComponent.prototype.ngOnInit = function() {};
    SortableHeaderComponent.prototype.emitSomeEvent = function() {
      this.eventEmitter.emit("Something " + this.model.name);
    };
    __decorate([core_1.HostBinding("hidden"), __metadata('design:type', Boolean)], SortableHeaderComponent.prototype, "isHidden", void 0);
    SortableHeaderComponent = __decorate([core_1.Component({
      moduleId: module.id,
      selector: 'th[simple-sortable-header]',
      inputs: ['id', 'model'],
      outputs: ['eventEmitter'],
      host: {'(click)': 'emitSomeEvent()'},
      template: "\n    {{model.name}}\n  "
    }), __metadata('design:paramtypes', [])], SortableHeaderComponent);
    return SortableHeaderComponent;
  }());
  exports.SortableHeaderComponent = SortableHeaderComponent;
  return module.exports;
});

System.registerDynamic("src/components/table-filter/table_text_filter.component", ["@angular/core", "@angular/common"], true, function($__require, exports, module) {
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
  var TableTextFilterComponent = (function() {
    function TableTextFilterComponent() {
      this.model = {};
      this.debounceMillSeconds = 200;
      this.eventEmitter = new core_1.EventEmitter();
      this.isHidden = false;
    }
    TableTextFilterComponent.prototype.ngOnInit = function() {
      this.term = "";
      this.termControl = new common_1.Control();
    };
    TableTextFilterComponent.prototype.ngOnChanges = function() {
      console.log("change" + this.term);
    };
    TableTextFilterComponent.prototype.emitSomeEvent = function() {
      this.eventEmitter.emit("Something " + this.model.name);
    };
    __decorate([core_1.HostBinding("hidden"), __metadata('design:type', Boolean)], TableTextFilterComponent.prototype, "isHidden", void 0);
    TableTextFilterComponent = __decorate([core_1.Component({
      moduleId: module.id,
      selector: 'th[table-text-filter]',
      inputs: ['id', 'model', 'debounceMillSeconds'],
      outputs: ['eventEmitter'],
      template: "\n    <input [value]=\"term\" [formControl]=\"termControl\" class=\"form-control input-sm\"/>\n  "
    }), __metadata('design:paramtypes', [])], TableTextFilterComponent);
    return TableTextFilterComponent;
  }());
  exports.TableTextFilterComponent = TableTextFilterComponent;
  return module.exports;
});

System.registerDynamic("ng2-search-table", ["@angular/core", "@angular/common", "@angular/http", "@angular/forms", "@angular/platform-browser", "./src/search-table.component", "./src/components/header/simple_header.component", "./src/components/header/sortable_header.component", "./src/components/table-filter/table_text_filter.component"], true, function($__require, exports, module) {
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
  var http_1 = $__require('@angular/http');
  var forms_1 = $__require('@angular/forms');
  var platform_browser_1 = $__require('@angular/platform-browser');
  var search_table_component_1 = $__require('./src/search-table.component');
  var simple_header_component_1 = $__require('./src/components/header/simple_header.component');
  var sortable_header_component_1 = $__require('./src/components/header/sortable_header.component');
  var table_text_filter_component_1 = $__require('./src/components/table-filter/table_text_filter.component');
  var Ng2SearchTableModule = (function() {
    function Ng2SearchTableModule() {}
    Ng2SearchTableModule.forRoot = function() {
      return {
        ngModule: Ng2SearchTableModule,
        providers: []
      };
    };
    Ng2SearchTableModule = __decorate([core_1.NgModule({
      imports: [platform_browser_1.BrowserModule, common_1.CommonModule, http_1.HttpModule, forms_1.FormsModule],
      declarations: [search_table_component_1.SearchTableComponent, simple_header_component_1.SimpleHeaderComponent, sortable_header_component_1.SortableHeaderComponent, table_text_filter_component_1.TableTextFilterComponent],
      exports: [search_table_component_1.SearchTableComponent, simple_header_component_1.SimpleHeaderComponent, sortable_header_component_1.SortableHeaderComponent, table_text_filter_component_1.TableTextFilterComponent]
    }), __metadata('design:paramtypes', [])], Ng2SearchTableModule);
    return Ng2SearchTableModule;
  }());
  exports.Ng2SearchTableModule = Ng2SearchTableModule;
  return module.exports;
});
