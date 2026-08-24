import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Usersdata } from '../../../services/usersdata';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-usercard',
  imports: [RouterModule, MatCardModule],
  templateUrl: './usercard.html',
  styleUrl: './usercard.scss'
})
export class Usercard implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userData: Usersdata
  ) {}

  selectedUser:any;
  selectedTab='profile'
  ngOnInit() {
    this.route.queryParams.subscribe(
      params=>{
        this.selectedTab = params['tab'] || ['profile']
      }
    )

    // this.route.paramMap.subscribe(
    //   params=>{
    //     let userid = +(params.get('id') || 0); // Default to 0 if null
    //     this.selectedUser = this.userData.users.find(u=>u.id==userid)
    //   }
    // )

    // also we can get id other way
  // let userid = this.route.snapshot.paramMap.get('id');
  // this.cusers = this.userData.users.find(u=>u.id==userid)

  const id= Number(this.route.snapshot.paramMap.get('id'));
  // this.selectedUser = this.userData.users.find(
  //   user=>user.id==id
  // );

  this.userData.getUserData().subscribe({
    next: (users:any)=>{
      this.selectedUser = users.find((user:any)=>user.id===id);
    }
  })

  }

  

}
