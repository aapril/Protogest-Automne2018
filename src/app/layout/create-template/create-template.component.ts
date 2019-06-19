import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent implements OnInit {
  templateType = "quebec";
  templateName = "";
  data = {
    quebec: require('../../../jsonDir/protocole-schema-quebec.json'),
    canada: require('../../../jsonDir/protocole-schema-canada.json')
  };
  currentSection: {}
  currentTemplate = {}

  constructor() {}

  ngOnInit() {
    
  }

  changeCurrentSection(sectionID) {
    this.currentSection = this.data[this.templateType].protocole[0].protocol_fields.find(section => section.sectionID === sectionID)
    console.log(this.currentSection);
  }

  setTemplateType(type){
    console.log(type);
    this.templateType = type;
  }
}
