import { Component, OnInit } from '@angular/core';
import { Letterofcredit } from '../letterofcredit';
import { LetterofcreditService } from '../letterofcredit.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  letterOfCredits: Letterofcredit[] = [];

  constructor(private locService: LetterofcreditService) { }

  ngOnInit() {
    this.getLocs();
  }

  getLocs(): void {
    this.locService.getLocs()
      .subscribe(locs => this.letterOfCredits = locs.slice(2, 5));
  }
}
