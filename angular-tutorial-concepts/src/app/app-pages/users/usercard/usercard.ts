import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Usersdata } from '../../../services/usersdata';

@Component({
  selector: 'app-usercard',
  imports: [],
  templateUrl: './usercard.html',
  styleUrl: './usercard.scss'
})
export class Usercard implements OnInit {

  constructor(private route: ActivatedRoute,
    private userData: Usersdata
  ) {

  }

  cuser:any;
  ngOnInit() {
    this.route.paramMap.subscribe(
      params=>{
        let userid = +(params.get('id') || 0); // Default to 0 if null
        this.cuser = this.userData.users.find(u=>u.id==userid)
      }
    )

    // also we can get id other way
  // let userid = this.route.snapshot.paramMap.get('id');
  // this.cusers = this.userData.users.find(u=>u.id==userid)
  }

  

}
