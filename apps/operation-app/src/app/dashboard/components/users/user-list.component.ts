import { Component, OnInit } from '@angular/core';
import { UserListDto } from '@operation-management/common';
import { UserService } from './user.service';

@Component({
  selector: 'operation-management-users-list',
  template: `
    <operation-management-users-collection
      [users]="users"
    ></operation-management-users-collection>
  `,
})
export class UsersListComponent implements OnInit {
  protected users: UserListDto[];

  constructor(private usrService: UserService) {}
  ngOnInit(): void {
    this.usrService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
