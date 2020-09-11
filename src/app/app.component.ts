import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SurvivorsService } from './core/services/survivors.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

  constructor(private service: SurvivorsService) {}

  ngOnInit(): void {
    this.service.get().subscribe(res => {
      console.log(res);
    });
  }

}
