import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-candidate',
  templateUrl: './app-candidate.component.html',
  styleUrls: ['./app-candidate.component.scss']
})
export class AppCandidateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onActivate(event: any) {
    window.scroll(0,0);
}
}
