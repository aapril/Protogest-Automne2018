import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent implements OnInit {
  templateType = "quebec";
  templateName = "";
  data = require('../../../jsonDir/protocole-schema-quebec.json');

  constructor() {}

  ngOnInit() {
    
  }

  changeCurrentSection(sectionID) {
    console.log(this.templateName)
  }

  setTemplate(type){
    this.templateType = type;
  }
}
