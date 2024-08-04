import { Component, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.scss'
})
export class HomeHeaderComponent implements OnInit{
  public user?: User | null = null;

  constructor(public appService: AppService) {}

  ngOnInit(): void {
    // this.appService.getProfile();
      this.user = this.appService.user;
      console.log("user status",this.user);   
  }
}
