import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DropdownComponent implements OnInit {

  @Input() placeholder = 'Select';
  @Input() searchPlaceholder = 'Search';
  @Input() searchOnKey = 'name';
  @Input() displayKey = 'name';
  @Input() options = [];

  config = {
    displayKey: this.displayKey,
    search: true,
    height: 'auto',
    placeholder: this.placeholder,
    limitTo: 0,
    noResultsFound: 'No results found',
    searchPlaceholder: this.searchPlaceholder,
    searchOnKey: this.searchOnKey,
    clearOnSelection: true
  };

  constructor() { }

  ngOnInit(): void {

  }

}
