import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { groupBy, mergeMap, never, of, reduce, toArray } from 'rxjs';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupComponent implements OnInit {

  ngOnInit(): void {
    let f: Array<Person> = new Array<Person>();
    f.push(new Person(1, 'a'));
    f.push(new Person(2, 'b'));
    f.push(new Person(3, 'c'));
    f.push(new Person(4, 'a'));
    f.push(new Person(5, 'b'));   

    of(f)
      .pipe(
        mergeMap(x => x),
        groupBy(x => x.type),
        mergeMap(group$ => group$.pipe(toArray()))
    ).subscribe((c) => {
      console.log(c);
      });
  }
}

export class Person {

  constructor(public id: number, public type: string) {

  }
}
