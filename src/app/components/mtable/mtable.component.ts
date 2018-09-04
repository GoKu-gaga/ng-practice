import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-mtable',
  templateUrl: './mtable.component.html',
  styleUrls: ['./mtable.component.scss']
})
export class MtableComponent implements OnInit {

  @Input() tableData: any[];
  @Input() total: number;

  displayedColumns: string[] = ['name', 'singer', 'album', 'duration'];

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {}
}

