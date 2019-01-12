import { Component, OnInit, Input } from '@angular/core';
import { Letterofcredit } from '../letterofcredit';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LetterofcreditService }  from '../letterofcredit.service';

@Component({
  selector: 'app-loc-detail',
  templateUrl: './loc-detail.component.html',
  styleUrls: ['./loc-detail.component.css']
})
export class LocDetailComponent implements OnInit {

  letterOfCredit: Letterofcredit;

  constructor(private route: ActivatedRoute,
              private locService: LetterofcreditService,
              private location: Location)
              { }

  ngOnInit() {
    this.getLoc();
  }

  getLoc(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.locService.getLoc(id)
      .subscribe(loc => this.letterOfCredit = loc);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
   this.locService.updateLocStatus(this.letterOfCredit)
     .subscribe(() => this.goBack());
  }

}
