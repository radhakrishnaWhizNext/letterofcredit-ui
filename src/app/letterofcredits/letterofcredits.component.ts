import { Component, OnInit } from '@angular/core';
import { Letterofcredit } from '../letterofcredit';
import { LetterofcreditService } from '../letterofcredit.service';

@Component({
  selector: 'app-letterofcredits',
  templateUrl: './letterofcredits.component.html',
  styleUrls: ['./letterofcredits.component.css']
})
export class LetterofcreditsComponent implements OnInit {

  letterOfCredits: Letterofcredit[];
  /*letterOfCredit: Letterofcredit = {
    id: 'LC0001',
    description: '100 Dell laptops',
    status: 'LC_INITIATED'
  };*/

  selectedLoc: Letterofcredit;

  onSelect(loc: Letterofcredit): void
  {
    this.selectedLoc = loc;
  }

  constructor(private locService: LetterofcreditService) { }

  ngOnInit() {
    this.getLocs();
  }

  getLocs(): void {
    this.locService.getLocs().subscribe(locs => this.letterOfCredits = locs);
  }

  addLoc(locId: string, description: string): void {
    locId = locId.trim();
    description = description.trim();
    if (!locId || !description) { return; }
    var lcObj = {
      locId: locId,
      description: description,
      status: 'LC_INITIATED'
    };
    this.locService.addLoc(lcObj as Letterofcredit)
      .subscribe(loc => {
        this.letterOfCredits.push(loc);
      });
  }

}
