import { DOCUMENT } from "@angular/common";
import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from "@angular/core";
import * as $ from "jquery";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @ViewChild("navMain")
  navMain!: ElementRef;

  constructor(@Inject(DOCUMENT) private document: Document) {}
  ngOnInit(): void {
    this.loadJsFile("assets/js/Animated-Type-Heading.js");
    this.loadJsFile("assets/js/main.js");
  }
  public loadJsFile(url: any) {
    let node = document.createElement("script");
    node.src = url;
    node.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(node);
  }
  @HostListener("window:scroll", []) onWindowScroll() {
    if (this.document.documentElement.scrollTop > 60) {
      this.navMain.nativeElement.classList.remove("is-transparent");
      this.navMain.nativeElement.classList.add("navbar-faded");
    } else {
      this.navMain.nativeElement.classList.add("is-transparent");
      this.navMain.nativeElement.classList.remove("navbar-faded");
    }
  }
}
