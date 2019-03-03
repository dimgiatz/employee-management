import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-action-navbar',
  templateUrl: './action-navbar.component.html',
  styleUrls: ['./action-navbar.component.scss']
})
export class ActionNavbarComponent implements OnInit {
  constructor(private data: DataService, private router: Router) { 
  }

  ngOnInit() {
    
  }
}
