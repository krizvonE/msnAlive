import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  timestamp = Date.now();
  price = 1223.12434234234;
  user = {
    name: 'Eduardo',
    age: 28,
    status: 'online',
    friend: true
  };
  constructor() { 

    // //convirtiendo arreglo a observable
    // const source = from([1, 2, 3, 4, 5]);
    // //agregando 10 a cada valor
    // const example = source.pipe(map(val => val + 10));
    // //output: 11, 12, 13, 14, 15
    // const stream = example.subscribe(val => console.log(val));
    
  }

  ngOnInit() {
  }

}
