import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateTemplateComponent implements OnInit {
  templateType = "quebec";
  templateName = "";
  data = {
    quebec: require('../../../jsonDir/protocole-schema-quebec.json'),
    canada: require('../../../jsonDir/protocole-schema-canada.json')
  };
  currentSection = {}
  currentTemplate = {}

  constructor() {}

  ngOnInit() {
    
  }

  changeCurrentSection(sectionID) {
    this.currentSection = this.data[this.templateType].protocole[0].protocol_fields.find(section => section.sectionID === sectionID)
  }

  setTemplateType(type){
    this.templateType = type;
  }
}
