import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  TemplateRef,
  contentChild,
  input,
  output,
} from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="img"></ng-content>

      <section>
        @for (item of list(); track item.id) {
          <ng-template
            [ngTemplateOutlet]="rowRef()"
            [ngTemplateOutletContext]="{ $implicit: item }" />
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="add.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent {
  list = input<any[]>();
  type = input.required<CardType>();
  customClass = input('');

  add = output();

  rowRef = contentChild.required('rowRef', { read: TemplateRef });
}
