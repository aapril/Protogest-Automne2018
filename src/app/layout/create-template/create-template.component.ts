import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateTemplateComponent implements OnInit {
  @Input() templateType;
  templateName = "";
  data = {
    quebec: require('../../../jsonDir/protocole-schema-quebec.json'),
    canada: require('../../../jsonDir/protocole-schema-canada.json')
  };
  currentSection = {
    subSection: []
  }
  @Input() selectedSections: any = []
  @Output() selectedSectionsChange = new EventEmitter(this.selectedSections);

  constructor() {}

  ngOnInit() {
    this.currentSection = this.data[this.templateType].protocole[0].protocol_fields[0]
  }

  changeCurrentSection(sectionID) {
    this.currentSection = this.data[this.templateType].protocole[0].protocol_fields.find(section => section.sectionID === sectionID)
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
    return this.currentSection.subSection.every(subSection => {
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

  setTemplateType(type){
    this.templateType = type;
  }
}
