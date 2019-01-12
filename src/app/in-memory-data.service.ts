import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Letterofcredit } from './letterofcredit';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const locs = [
      { id: 1, locId: 'LC001', description: '100 Dell Laptops', status: 'LC_INITIATED' },
      { id: 2, locId: 'LC002', description: '200 Apple Macs', status: 'LC_INITIATED'},
      { id: 3, locId: 'LC003', description: '150 MI mobiles', status: 'LC_INITIATED' },
      { id: 4, locId: 'LC004', description: '300 Samsung mobiles', status: 'LC_BB_APPROVED' },
      { id: 5, locId: 'LC005', description: '1000 Vivo mobiles', status: 'LC_INITIATED' }
    ];
    return {locs};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(locs: Letterofcredit[]): number {
    return locs.length > 0 ? Math.max(...locs.map(loc => loc.id)) + 1 : 11;
  }
}
