import {Injectable} from "@angular/core";
import {Http, URLSearchParams, RequestOptions} from "@angular/http";

@Injectable()
export class SearchTableService {
  constructor(private http: Http) {
  }

  // [Sort Params]
  // {
  //    "something": "desc",
  //    "another": "asc"
  // }
  //
  // [Filter Params]
  // {
  //    "something": "someValue",
  //    "another": "1"
  // }
  public search(searchUrl: string, options?: any): any {
    let page = options && options.page || 1;
    let per = options && options.per || 20;
    let sort = options && options.sort;
    let filter = options && options.filter;
    let searchParams: URLSearchParams = new URLSearchParams();
    searchParams.set("page", page.toString());
    searchParams.set("per", per.toString());
    if (sort) {
      Object.keys(sort).forEach((key: any) => {
        searchParams.set("sort[" + key + "]", sort[key]);
      });
    }
    if (filter) {
      Object.keys(filter).forEach((key: string) => {
        searchParams.set("filter[" + key + "]", filter[key]);
      });
    }

    let requestOptions = new RequestOptions({
      search: searchParams
    });
    return this
      .http
      .get(searchUrl, requestOptions)
      .map(r => r.json())
      .map(r => {
        return {
          page: r.page,
          per: r.per,
          totalCount: r.totalCount,
          results: r.results
        };
      });
  }
}
