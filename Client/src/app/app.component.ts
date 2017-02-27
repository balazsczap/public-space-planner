export class User{
	id: number;
	name: string;
	username: string;
}
const USERS: User[] = [
  { id: 11, name: 'Mr. Nice', username: 'Mr. Nice' },
  { id: 12, name: 'Narco', username: 'Narco' },
  { id: 13, name: 'Bombasto', username: 'Bombasto' },
  { id: 14, name: 'Celeritas', username: 'Celeritas' },
  { id: 15, name: 'Magneta', username: 'Magneta' },
  { id: 16, name: 'RubberMan', username: 'RubberMan' },
  { id: 17, name: 'Dynama', username: 'Dynama' },
  { id: 18, name: 'Dr IQ', username: 'Dr IQ' },
  { id: 19, name: 'Magma', username: 'Magma' },
  { id: 20, name: 'Tornado', username: 'Tornado' }
];
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})



export class AppComponent {
  title = 'app works!';
  users = USERS;
  selectedUser : User;

  onSelect(user: User): void{
  	this.selectedUser = user;
  }
}
