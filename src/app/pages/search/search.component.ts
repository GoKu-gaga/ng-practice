import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { SearchService } from './search.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {

  filteredOptions: Observable<string[]>;
  hotWords: string[];

  tableData: any[];
  total: number;

  tableColumns: [{ key: 'id', value: 'id' }, { key: 'name', value: '歌名' }];
  displayedColumns = ['id', 'name'];

  constructor(private service: SearchService) { }

  suggest$: Observable<string[]>;
  private searchText$ = new Subject<string>();

  ngOnInit() {
    this.service.getHot().subscribe(
      words => {
        this.hotWords = words;
      }
    );

    this.suggest$ = this.searchText$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(key => this.service.getSuggest(key))
    );
  }

  search(event: any) {
    const key = event.target.value;
    const code = event.code;
    if (code === 'Enter') {
      this.doSearch(key);
      return;
    }
    this.searchText$.next(key);
  }

  optionSelected(event: any) {
    this.doSearch(event.option.value);
  }

  hotWordClick(event: any, word: string) {
    this.doSearch(word);
  }

  doSearch(key) {
    this.service.search(key).subscribe(
      res => {
        this.tableData = res.list;
        this.total = res.total;
      }
    );
  }

}
