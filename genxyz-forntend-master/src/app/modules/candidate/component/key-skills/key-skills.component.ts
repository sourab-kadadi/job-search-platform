import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
export interface Skills {
  name: string;
}
@Component({
  selector: "app-key-skills",
  templateUrl: "./key-skills.component.html",
  styleUrls: ["./key-skills.component.scss"]
})
export class KeySkillsComponent implements OnInit {
  selectable = true;
  removable = true;
  addOnBlur = true;
  view = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  @Input() skills: Skills[] = [];
  // @Input() addOrEdit: boolean = false;
  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  addOrEdit(type: any) {
    if (type == 'add') {
      this.skills = [];
    }
    this.view = false;
  }
  Save() {
    this.view = true;
    this.onSave.emit({ data: this.skills});
  }

  Cancel() {
    this.view = true;
    this.onCancel.emit();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our fruit
    if (value) {
      this.skills.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(skill: Skills): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }
}
