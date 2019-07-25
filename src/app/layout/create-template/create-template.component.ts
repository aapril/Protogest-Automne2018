import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateTemplateComponent implements OnInit, OnChanges {
  currentSection = {
    subSection: []
  }
  @Input() selectedSections: any = []
  @Output() selectedSectionsChange = new EventEmitter();

  @Input() selectedSchema: any

  constructor() {}

  ngOnInit() {
    this.currentSection = this.selectedSchema ? this.selectedSchema.protocolFields[0] : undefined;
  }

  ngOnChanges(){
    this.currentSection = this.selectedSchema ? this.selectedSchema.protocolFields[0] : undefined;
  }

  changeCurrentSection(sectionID) {
    this.currentSection = this.selectedSchema.protocolFields.find(section => section.sectionID === sectionID)
  }

  toggleSection(sectionNumber) {
    let index = this.selectedSections.indexOf(sectionNumber);
    if(index < 0) {
      this.selectedSections.push(sectionNumber);
    } else {
      this.selectedSections.splice(index, 1);
    }
  }

  areAllSelected(){
    return this.currentSection && this.currentSection.subSection.every(subSection => {
      if(this.selectedSections.find(selected => selected === subSection.num)) {
        return true;
      }
      return false;
    });
  }

  selectAll() {
    if(this.areAllSelected()) {
      let toRemove = this.currentSection.subSection.map(subSection => subSection.num)
      toRemove.forEach(removable => {
        this.selectedSections.splice(this.selectedSections.indexOf(removable), 1);
      })
    } else {
      this.currentSection.subSection.forEach(subSection => {
        if(this.selectedSections.indexOf(subSection.num) < 0) {
          this.selectedSections.push(subSection.num);
        }
      })
    }
  }

  isSectionSelected(sectionNumber) {
    return (this.selectedSections.indexOf(sectionNumber) >= 0)
  }
}
