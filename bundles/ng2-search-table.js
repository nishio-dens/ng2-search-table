System.registerDynamic("components/search-table.component", ["@angular/core", "../services/search-table.service", "./header/no-header.component", "./table-filter/no-filter.component"], true, function($__require, exports, module) {
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
  var search_table_service_1 = $__require('../services/search-table.service');
  var no_header_component_1 = $__require('./header/no-header.component');
  var no_filter_component_1 = $__require('./table-filter/no-filter.component');
  var SearchTableComponent = (function() {
    function SearchTableComponent(componentResolver, searchTableService, compiler) {
      this.componentResolver = componentResolver;
      this.searchTableService = searchTableService;
      this.compiler = compiler;
      this.config = {};
      this.dataRows = [];
      this.headerComponents = [];
      this.sortCondition = {};
      this.filterConditions = {};
      this.currentPage = 1;
      this.pagePer = 20;
      this.totalCount = 0;
      this.debounceTime = 200;
      this.headerInstances = {};
      this.filterInstances = {};
      this.defaultValues = {};
      this.visibilities = {};
    }
    SearchTableComponent.prototype.ngOnInit = function() {
      var _this = this;
      this.debounceSearchEventEmitter = new core_1.EventEmitter();
      this.debounceSearchEventEmitter.debounceTime(this.debounceTime).subscribe(function(_) {
        return _this.search();
      });
      this.parseConfig(this.config);
      this.columns.forEach(function(header) {
        var headerComponent = header.headerComponent || no_header_component_1.NoHeaderComponent;
        _this.compiler.compileComponentAsync(headerComponent).then(function(factory) {
          var c = _this.createHeaderTableComponent(factory, header, _this.headerViewComponents);
          _this.headerInstances[header.name] = c.instance;
        });
        var filterComponent = header.filterComponent || no_filter_component_1.NoFilterComponent;
        _this.compiler.compileComponentAsync(filterComponent).then(function(factory) {
          var c = _this.createFilterTableComponent(factory, header, _this.headerFilterComponents);
          _this.filterInstances[header.name] = c.instance;
        });
      });
    };
    SearchTableComponent.prototype.getCurrentPage = function() {
      return this.currentPage;
    };
    SearchTableComponent.prototype.getPagePer = function() {
      return this.pagePer;
    };
    SearchTableComponent.prototype.getTotalCount = function() {
      return this.totalCount;
    };
    SearchTableComponent.prototype.setCurrentPage = function(page) {
      this.currentPage = page;
      this.search();
    };
    SearchTableComponent.prototype.setPagePer = function(per) {
      this.pagePer = per;
      this.setCurrentPage(1);
    };
    SearchTableComponent.prototype.search = function() {
      var _this = this;
      var searchParams = {
        page: this.getCurrentPage(),
        per: this.getPagePer(),
        sort: this.sortCondition,
        filter: this.filterConditions
      };
      this.searchTableService.search(this.config.url, searchParams).subscribe(function(r) {
        _this.setTotalCount(r.totalCount);
        _this.dataRows = r.results;
      });
    };
    SearchTableComponent.prototype.setSortDirection = function(name, direction) {
      this.sortCondition = {};
      this.sortCondition[name] = direction;
      this.clearHeaderSortDirection(name);
    };
    SearchTableComponent.prototype.setFilterValue = function(name, value, subComponentName) {
      var instance = this.filterInstances[name];
      if (instance) {
        if (subComponentName) {
          instance.setValue(subComponentName, value);
        } else {
          instance.setValue(name, value);
        }
      }
      this.defaultValues[name] = {
        value: value,
        subComponentName: subComponentName
      };
      this.resetCurrentPage();
    };
    SearchTableComponent.prototype.setVisibility = function(name, visible) {
      if (this.headerInstances[name]) {
        this.headerInstances[name].setVisibility(visible);
      }
      if (this.filterInstances[name]) {
        this.filterInstances[name].setVisibility(visible);
      }
      this.visibilities[name] = visible;
    };
    SearchTableComponent.prototype.parseConfig = function(config) {
      if (config.defaultPagePer) {
        this.pagePer = config.defaultPagePer;
      }
    };
    SearchTableComponent.prototype.setTotalCount = function(count) {
      this.totalCount = count;
    };
    SearchTableComponent.prototype.resetCurrentPage = function() {
      this.currentPage = 1;
    };
    SearchTableComponent.prototype.createHeaderTableComponent = function(factory, header, viewComponents) {
      var _this = this;
      var c = viewComponents.createComponent(factory);
      c.instance.name = header.name;
      c.instance.model = header.model;
      c.instance.eventEmitter.subscribe(function(v) {
        _this.setSortDirection(v.name, v.value);
        _this.search();
      });
      if (this.sortCondition[header.name]) {
        c.instance.model.direction = this.sortCondition[header.name];
      }
      if (this.visibilities[header.name] !== true && this.visibilities[header.name] !== false) {
        this.visibilities[header.name] = true;
      }
      c.instance.setVisibility(this.visibilities[header.name]);
      return c;
    };
    SearchTableComponent.prototype.createFilterTableComponent = function(factory, header, viewComponents) {
      var _this = this;
      var c = viewComponents.createComponent(factory);
      c.instance.name = header.name;
      c.instance.model = header.model;
      c.instance.eventEmitter.subscribe(function(v) {
        _this.filterConditions[v.name] = v.value;
        _this.resetCurrentPage();
        _this.debounceSearchEventEmitter.emit(true);
      });
      var defaultValue = this.defaultValues[header.name];
      if (defaultValue) {
        if (defaultValue.subComponentName) {
          c.instance.setValue(defaultValue.subComponentName, defaultValue.value);
        } else {
          c.instance.setValue(header.name, defaultValue.value);
        }
      }
      if (this.visibilities[header.name] !== true && this.visibilities[header.name] !== false) {
        this.visibilities[header.name] = true;
      }
      c.instance.setVisibility(this.visibilities[header.name]);
      return c;
    };
    SearchTableComponent.prototype.clearHeaderSortDirection = function(without) {
      var _this = this;
      if (this.columns) {
        this.columns.forEach(function(v) {
          if (v.name !== without) {
            _this.headerInstances[v.name].model.direction = "";
          }
        });
      }
    };
    __decorate([core_1.ViewChild("headerViewComponents", {read: core_1.ViewContainerRef}), __metadata('design:type', Object)], SearchTableComponent.prototype, "headerViewComponents", void 0);
    __decorate([core_1.ViewChild("headerFilterComponents", {read: core_1.ViewContainerRef}), __metadata('design:type', Object)], SearchTableComponent.prototype, "headerFilterComponents", void 0);
    SearchTableComponent = __decorate([core_1.Component({
      moduleId: module.id,
      selector: "search-table",
      inputs: ["tableClass", "columns", "config"],
      template: "\n  <table [ngClass]=\"tableClass\">\n    <thead>\n      <tr>\n        <template #headerViewComponents></template>\n      </tr>\n      <tr>\n        <template #headerFilterComponents></template>\n      </tr>\n    </thead>\n    <ng-content></ng-content>\n  </table>\n  "
    }), __metadata('design:paramtypes', [core_1.ComponentResolver, search_table_service_1.SearchTableService, core_1.Compiler])], SearchTableComponent);
    return SearchTableComponent;
  }());
  exports.SearchTableComponent = SearchTableComponent;
  return module.exports;
});

System.registerDynamic("services/search-table.service", ["@angular/core", "@angular/http"], true, function($__require, exports, module) {
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
  var http_1 = $__require('@angular/http');
  var SearchTableService = (function() {
    function SearchTableService(http) {
      this.http = http;
    }
    SearchTableService.prototype.search = function(searchUrl, options) {
      var page = options && options.page || 1;
      var per = options && options.per || 20;
      var sort = options && options.sort;
      var filter = options && options.filter;
      var searchParams = new http_1.URLSearchParams();
      searchParams.set("page", page.toString());
      searchParams.set("per", per.toString());
      if (sort) {
        Object.keys(sort).forEach(function(key) {
          searchParams.set("sort[" + key + "]", sort[key]);
        });
      }
      if (filter) {
        Object.keys(filter).forEach(function(key) {
          searchParams.set("filter[" + key + "]", filter[key]);
        });
      }
      var requestOptions = new http_1.RequestOptions({search: searchParams});
      return this.http.get(searchUrl, requestOptions).map(function(r) {
        return r.json();
      }).map(function(r) {
        return {
          page: r.page,
          per: r.per,
          totalCount: r.totalCount,
          results: r.results
        };
      });
    };
    SearchTableService = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [http_1.Http])], SearchTableService);
    return SearchTableService;
  }());
  exports.SearchTableService = SearchTableService;
  return module.exports;
});

System.registerDynamic("components/header/no-header.component", ["@angular/core"], true, function($__require, exports, module) {
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
  var NoHeaderComponent = (function() {
    function NoHeaderComponent() {
      this.model = {};
      this.eventEmitter = new core_1.EventEmitter();
      this.isHidden = false;
    }
    NoHeaderComponent.prototype.setVisibility = function(visible) {
      this.isHidden = !visible;
    };
    __decorate([core_1.HostBinding("hidden"), __metadata('design:type', Boolean)], NoHeaderComponent.prototype, "isHidden", void 0);
    NoHeaderComponent = __decorate([core_1.Component({
      moduleId: module.id,
      selector: "th[no-header]",
      inputs: ["name", "model"],
      outputs: ["eventEmitter"],
      template: "\n  "
    }), __metadata('design:paramtypes', [])], NoHeaderComponent);
    return NoHeaderComponent;
  }());
  exports.NoHeaderComponent = NoHeaderComponent;
  return module.exports;
});

System.registerDynamic("components/header/simple-header.component", ["@angular/core"], true, function($__require, exports, module) {
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
    SimpleHeaderComponent.prototype.setVisibility = function(visible) {
      this.isHidden = !visible;
    };
    __decorate([core_1.HostBinding("hidden"), __metadata('design:type', Boolean)], SimpleHeaderComponent.prototype, "isHidden", void 0);
    SimpleHeaderComponent = __decorate([core_1.Component({
      moduleId: module.id,
      selector: "th[simple-header]",
      inputs: ["name", "model"],
      outputs: ["eventEmitter"],
      template: "\n    {{model.displayName}}\n  "
    }), __metadata('design:paramtypes', [])], SimpleHeaderComponent);
    return SimpleHeaderComponent;
  }());
  exports.SimpleHeaderComponent = SimpleHeaderComponent;
  return module.exports;
});

System.registerDynamic("components/header/sortable-header.component", ["@angular/core"], true, function($__require, exports, module) {
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
    Object.defineProperty(SortableHeaderComponent.prototype, "asc", {
      get: function() {
        return this.model.direction === "asc";
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(SortableHeaderComponent.prototype, "desc", {
      get: function() {
        return this.model.direction === "desc";
      },
      enumerable: true,
      configurable: true
    });
    SortableHeaderComponent.prototype.onToggleSort = function() {
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
    };
    SortableHeaderComponent.prototype.setVisibility = function(visible) {
      this.isHidden = !visible;
    };
    __decorate([core_1.HostBinding("hidden"), __metadata('design:type', Boolean)], SortableHeaderComponent.prototype, "isHidden", void 0);
    __decorate([core_1.HostBinding("class.sort-asc"), __metadata('design:type', Object)], SortableHeaderComponent.prototype, "asc", null);
    __decorate([core_1.HostBinding("class.sort-desc"), __metadata('design:type', Object)], SortableHeaderComponent.prototype, "desc", null);
    SortableHeaderComponent = __decorate([core_1.Component({
      moduleId: module.id,
      selector: "th[simple-sortable-header]",
      inputs: ["name", "model"],
      outputs: ["eventEmitter"],
      host: {"(click)": "onToggleSort()"},
      template: "\n    {{model.displayName}}\n    <i class=\"pull-right fa\"\n    [ngClass]=\"{'fa-sort': (model.direction != 'asc' && model.direction != 'desc'),\n      'fa-sort-asc': model.direction == 'asc',\n      'fa-sort-desc': model.direction == 'desc'}\"\n    aria-hidden='true'></i>\n  "
    }), __metadata('design:paramtypes', [])], SortableHeaderComponent);
    return SortableHeaderComponent;
  }());
  exports.SortableHeaderComponent = SortableHeaderComponent;
  return module.exports;
});

System.registerDynamic("components/table-filter/no-filter.component", ["@angular/core"], true, function($__require, exports, module) {
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
  var NoFilterComponent = (function() {
    function NoFilterComponent() {
      this.model = {};
      this.eventEmitter = new core_1.EventEmitter();
      this.isHidden = false;
    }
    NoFilterComponent.prototype.setValue = function(name, value) {};
    NoFilterComponent.prototype.setVisibility = function(visible) {
      this.isHidden = !visible;
    };
    __decorate([core_1.HostBinding("hidden"), __metadata('design:type', Boolean)], NoFilterComponent.prototype, "isHidden", void 0);
    NoFilterComponent = __decorate([core_1.Component({
      moduleId: module.id,
      selector: "th[no-filter]",
      inputs: ["name", "model"],
      outputs: ["eventEmitter"],
      template: "\n  "
    }), __metadata('design:paramtypes', [])], NoFilterComponent);
    return NoFilterComponent;
  }());
  exports.NoFilterComponent = NoFilterComponent;
  return module.exports;
});

System.registerDynamic("components/table-filter/text-filter.component", ["@angular/core", "@angular/forms"], true, function($__require, exports, module) {
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
  var forms_1 = $__require('@angular/forms');
  var TextFilterComponent = (function() {
    function TextFilterComponent() {
      this.model = {};
      this.debounceMillSeconds = 300;
      this.eventEmitter = new core_1.EventEmitter();
      this.isHidden = false;
    }
    TextFilterComponent.prototype.ngOnInit = function() {
      var _this = this;
      this.termControl = new forms_1.FormControl();
      this.termControl.valueChanges.subscribe(function(newValue) {
        var value = newValue || "";
        _this.eventEmitter.emit({
          value: value,
          model: _this.model,
          name: _this.name
        });
      });
    };
    TextFilterComponent.prototype.setValue = function(name, value) {
      this.term = value;
    };
    TextFilterComponent.prototype.setVisibility = function(visible) {
      this.isHidden = !visible;
    };
    __decorate([core_1.HostBinding("hidden"), __metadata('design:type', Boolean)], TextFilterComponent.prototype, "isHidden", void 0);
    TextFilterComponent = __decorate([core_1.Component({
      moduleId: module.id,
      selector: "th[text-filter]",
      inputs: ["name", "model", "debounceMillSeconds"],
      outputs: ["eventEmitter"],
      template: "\n    <input class=\"form-control input-sm\" [formControl]=\"termControl\" [(ngModel)]=\"term\" />\n  "
    }), __metadata('design:paramtypes', [])], TextFilterComponent);
    return TextFilterComponent;
  }());
  exports.TextFilterComponent = TextFilterComponent;
  return module.exports;
});

System.registerDynamic("components/table-filter/select-filter.component", ["@angular/core", "@angular/forms"], true, function($__require, exports, module) {
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
  var forms_1 = $__require('@angular/forms');
  var SelectFilterComponent = (function() {
    function SelectFilterComponent() {
      this.model = {};
      this.eventEmitter = new core_1.EventEmitter();
      this.isHidden = false;
    }
    SelectFilterComponent.prototype.ngOnInit = function() {
      var _this = this;
      this.selectControl = new forms_1.FormControl();
      this.selectControl.valueChanges.subscribe(function(v) {
        var newValue = v || "";
        _this.eventEmitter.emit({
          value: newValue,
          model: _this.model,
          name: _this.name
        });
      });
    };
    SelectFilterComponent.prototype.setValue = function(name, value) {
      this.selectValue = value;
    };
    SelectFilterComponent.prototype.setVisibility = function(visible) {
      this.isHidden = !visible;
    };
    __decorate([core_1.HostBinding("hidden"), __metadata('design:type', Boolean)], SelectFilterComponent.prototype, "isHidden", void 0);
    SelectFilterComponent = __decorate([core_1.Component({
      moduleId: module.id,
      selector: "th[select-filter]",
      inputs: ["name", "model"],
      outputs: ["eventEmitter"],
      template: "\n  <select class=\"form-control input-sm\"\n          [formControl]=\"selectControl\" [(ngModel)]=\"selectValue\">\n    <option *ngFor=\"let cond of model.selectValues\" value=\"{{cond.id}}\">\n      {{cond.name}}\n    </option>\n  </select>\n  "
    }), __metadata('design:paramtypes', [])], SelectFilterComponent);
    return SelectFilterComponent;
  }());
  exports.SelectFilterComponent = SelectFilterComponent;
  return module.exports;
});

System.registerDynamic("components/table-filter/from-to-text-filter.component", ["@angular/core", "@angular/forms"], true, function($__require, exports, module) {
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
  var forms_1 = $__require('@angular/forms');
  var FromToTextFilterComponent = (function() {
    function FromToTextFilterComponent() {
      this.model = {};
      this.eventEmitter = new core_1.EventEmitter();
      this.isHidden = false;
    }
    FromToTextFilterComponent.prototype.ngOnInit = function() {
      this.termFromControl = new forms_1.FormControl();
      this.termToControl = new forms_1.FormControl();
      this.setValueChangeEmitter(this.termFromControl, this.model.multipleFilter[0].name);
      this.setValueChangeEmitter(this.termToControl, this.model.multipleFilter[1].name);
    };
    FromToTextFilterComponent.prototype.setValue = function(name, value) {
      if (this.model.multipleFilter[0].name === name) {
        this.fromTerm = value;
      } else if (this.model.multipleFilter[1].name === name) {
        this.toTerm = value;
      }
    };
    FromToTextFilterComponent.prototype.setVisibility = function(visible) {
      this.isHidden = !visible;
    };
    FromToTextFilterComponent.prototype.setValueChangeEmitter = function(control, controlName) {
      var _this = this;
      control.valueChanges.subscribe(function(newValue) {
        var value = (control === _this.termFromControl ? _this.fromTerm : _this.toTerm) || "";
        _this.eventEmitter.emit({
          value: value,
          model: _this.model,
          name: controlName
        });
      });
    };
    __decorate([core_1.HostBinding("hidden"), __metadata('design:type', Boolean)], FromToTextFilterComponent.prototype, "isHidden", void 0);
    FromToTextFilterComponent = __decorate([core_1.Component({
      moduleId: module.id,
      selector: "th[from-to-text-filter]",
      inputs: ["name", "model", "debounceMillSeconds"],
      outputs: ["eventEmitter"],
      template: "\n    <div class=\"row\">\n      <div class=\"col-xs-6\">\n        <input class=\"form-control input-sm\"\n               [formControl]=\"termFromControl\"\n               [(ngModel)]=\"fromTerm\"\n               placeholder=\"{{model.multipleFilter[0].placeholder}}\" />\n      </div>\n      <div class=\"col-xs-6\">\n        <input class=\"form-control input-sm\"\n               [formControl]=\"termToControl\"\n               [(ngModel)]=\"toTerm\"\n               placeholder=\"{{model.multipleFilter[1].placeholder}}\"/>\n      </div>\n    </div>\n  "
    }), __metadata('design:paramtypes', [])], FromToTextFilterComponent);
    return FromToTextFilterComponent;
  }());
  exports.FromToTextFilterComponent = FromToTextFilterComponent;
  return module.exports;
});

System.registerDynamic("ng2-search-table", ["@angular/core", "@angular/common", "@angular/http", "@angular/forms", "@angular/platform-browser", "rxjs/Rx", "./components/search-table.component", "./services/search-table.service", "./components/header/no-header.component", "./components/header/simple-header.component", "./components/header/sortable-header.component", "./components/table-filter/no-filter.component", "./components/table-filter/text-filter.component", "./components/table-filter/select-filter.component", "./components/table-filter/from-to-text-filter.component"], true, function($__require, exports, module) {
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
  $__require('rxjs/Rx');
  var search_table_component_1 = $__require('./components/search-table.component');
  var search_table_service_1 = $__require('./services/search-table.service');
  var no_header_component_1 = $__require('./components/header/no-header.component');
  var simple_header_component_1 = $__require('./components/header/simple-header.component');
  var sortable_header_component_1 = $__require('./components/header/sortable-header.component');
  var no_filter_component_1 = $__require('./components/table-filter/no-filter.component');
  var text_filter_component_1 = $__require('./components/table-filter/text-filter.component');
  var select_filter_component_1 = $__require('./components/table-filter/select-filter.component');
  var from_to_text_filter_component_1 = $__require('./components/table-filter/from-to-text-filter.component');
  var search_table_component_2 = $__require('./components/search-table.component');
  exports.SearchTableComponent = search_table_component_2.SearchTableComponent;
  var search_table_service_2 = $__require('./services/search-table.service');
  exports.SearchTableService = search_table_service_2.SearchTableService;
  var no_header_component_2 = $__require('./components/header/no-header.component');
  exports.NoHeaderComponent = no_header_component_2.NoHeaderComponent;
  var simple_header_component_2 = $__require('./components/header/simple-header.component');
  exports.SimpleHeaderComponent = simple_header_component_2.SimpleHeaderComponent;
  var sortable_header_component_2 = $__require('./components/header/sortable-header.component');
  exports.SortableHeaderComponent = sortable_header_component_2.SortableHeaderComponent;
  var no_filter_component_2 = $__require('./components/table-filter/no-filter.component');
  exports.NoFilterComponent = no_filter_component_2.NoFilterComponent;
  var text_filter_component_2 = $__require('./components/table-filter/text-filter.component');
  exports.TextFilterComponent = text_filter_component_2.TextFilterComponent;
  var select_filter_component_2 = $__require('./components/table-filter/select-filter.component');
  exports.SelectFilterComponent = select_filter_component_2.SelectFilterComponent;
  var from_to_text_filter_component_2 = $__require('./components/table-filter/from-to-text-filter.component');
  exports.FromToTextFilterComponent = from_to_text_filter_component_2.FromToTextFilterComponent;
  var Ng2SearchTableModule = (function() {
    function Ng2SearchTableModule() {}
    Ng2SearchTableModule.forRoot = function() {
      return {
        ngModule: Ng2SearchTableModule,
        providers: []
      };
    };
    Ng2SearchTableModule = __decorate([core_1.NgModule({
      imports: [platform_browser_1.BrowserModule, common_1.CommonModule, http_1.HttpModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
      declarations: [search_table_component_1.SearchTableComponent, no_header_component_1.NoHeaderComponent, simple_header_component_1.SimpleHeaderComponent, sortable_header_component_1.SortableHeaderComponent, no_filter_component_1.NoFilterComponent, text_filter_component_1.TextFilterComponent, select_filter_component_1.SelectFilterComponent, from_to_text_filter_component_1.FromToTextFilterComponent],
      providers: [search_table_service_1.SearchTableService],
      exports: [search_table_component_1.SearchTableComponent, no_header_component_1.NoHeaderComponent, simple_header_component_1.SimpleHeaderComponent, sortable_header_component_1.SortableHeaderComponent, no_filter_component_1.NoFilterComponent, text_filter_component_1.TextFilterComponent, select_filter_component_1.SelectFilterComponent, from_to_text_filter_component_1.FromToTextFilterComponent]
    }), __metadata('design:paramtypes', [])], Ng2SearchTableModule);
    return Ng2SearchTableModule;
  }());
  exports.Ng2SearchTableModule = Ng2SearchTableModule;
  return module.exports;
});
