import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { generateOutlookAuthUrl } from '../../utils/outlookHelper.js';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss'],
  providers: []
})
export class CreateTemplateComponent implements OnInit {
  protocolType: String;
  templateName = "";
  data = require('../../../jsonDir/protocole-schema-quebec.json');

  constructor() {}

  ngOnInit() {
    
  }

  setTemplateName(name) {
    this.templateName = name;
  }

  setProtocol(type){
    this.protocolType = type;
  }
}
