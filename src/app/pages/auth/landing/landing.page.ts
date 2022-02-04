import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonRoutes } from 'src/global.routes';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onLogin(){
    this.router.navigate([`${CommonRoutes.AUTH}/${CommonRoutes.LOGIN}`]);
  }
  onSignup(){
    this.router.navigate([`${CommonRoutes.AUTH}/${CommonRoutes.PERSONA_SELECTION}`])
  }

}