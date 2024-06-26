import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      [type]="cardType"
      (add)="addCity()"
      customClass="bg-light-red">
      <img ngSrc="assets/img/city.png" height="200" width="200" />
      <ng-template #rowRef let-city>
        <app-list-item
          [id]="city.id"
          [name]="city.name"
          (delete)="deleteCity(city.id)" />
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, NgOptimizedImage],
})
export class CityCardComponent implements OnInit {
  store = inject(CityStore);
  http = inject(FakeHttpService);
  cities = toSignal(this.store.cities$, { initialValue: [] });
  cardType = CardType.CITY;
  constructor() {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
