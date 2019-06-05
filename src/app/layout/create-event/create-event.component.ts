

declare var require: any;
import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ProtocolService } from '../../shared/services/protocol.service';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import {NgbCalendar, NgbDatepickerConfig, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})


export class CreateEventComponent implements OnChanges {
  @Input() Protocol: string;
  @Input() langueProtocol: string;

  constructor(private protocolService: ProtocolService, protected http: HttpClient, @Inject(DOCUMENT) document, config: NgbDatepickerConfig, calendar: NgbCalendar) {
      // customize default values of datepickers used by this component tree
      config.minDate = {year: 1900, month: 1, day: 1};
      config.maxDate = {year: 2099, month: 12, day: 31};
      // days that don't belong to current month are not visible
      config.outsideDays = 'hidden';

      // The localStorage is set in the CreateProtocolComponent
      if (localStorage.getItem('occupiedDates') !== null) {
          this.occupiedDates = localStorage.getItem('occupiedDates');
      }
      // weekends are disabled
      config.markDisabled = (date: NgbDate) => (this.occupiedDates.indexOf(date.year + '-' + ((date.month < 10) ? '0' + date.month : date.month) + '-' + ((date.day < 10) ? '0' + date.day : date.day)) !== -1);


  }

  data = require('../../../jsonDir/protocole-schema-quebec-fr.json');
  occupiedDates: any = [];
  test: any;

  temp = {};
  final: any = [];

    isDisabled(date: NgbDateStruct) {
        // The localStorage is set in the CreateProtocolComponent
        if (localStorage.getItem('occupiedDates') !== null) {
            const testoccupiedDates = localStorage.getItem('occupiedDates');
            return testoccupiedDates.indexOf(date.year + '-' + ((date.month < 10) ? '0' + date.month : date.month) + '-' + ((date.day < 10) ? '0' + date.day : date.day)) > -1;
        } else {
            return false;
        }
    }

  ngOnChanges(changes: SimpleChanges) {
      if (this.langueProtocol == 'fr') {
          if (this.Protocol == 'canada') {
              this.data = require('../../../jsonDir/protocole-schema-canada-fr.json');
          } else {
              this.data = require('../../../jsonDir/protocole-schema-quebec-fr.json');
          }
      } else {
          if (this.Protocol == 'canada') {
              this.data = require('../../../jsonDir/protocole-schema-canada-en.json');
          } else {
              this.data = require('../../../jsonDir/protocole-schema-quebec-en.json');
          }
      }
  }
  onChange(t2, value) {
    // The localStorage is set in the CreateProtocolComponent
    if (localStorage.getItem('occupiedDates') !== null) {
      this.occupiedDates = localStorage.getItem('occupiedDates');
    }
    if (t2.type.toUpperCase() !== 'BOOL') {
      let update = false;
      for (let i = 0; i < this.final.length; i++) {
        const obj = this.final[i];

        if (obj.num == t2.num) {
          update = true;
          if (this.final[i].type == 'date') {
            if (this.occupiedDates.indexOf(value.year + '-' + ((value.month < 10) ? '0' + value.month : value.month) + '-' + ((value.day < 10) ? '0' + value.day : value.day)) > -1) {
              this.final[i].value = value.year + '-' + value.month + '-' + value.day;
            } else {
              console.log(t2);
              alert('This date is already occupied in your calendar.');
              (<HTMLInputElement>document.getElementById(t2.type.concat(t2.num))).value = '';
            }
          } else {
            this.final[i].value = value;
          }

        }
      }

      if (!update) {
        let doIt = true;
        if (t2.type === 'date' && this.occupiedDates.indexOf(value.year + '-' + ((value.month < 10) ? '0' + value.month : value.month) + '-' + ((value.day < 10) ? '0' + value.day : value.day)) > -1) {
          doIt = false;
          alert('This date is already occupied in your calendar.');
          (<HTMLInputElement>document.getElementById(t2.type.concat(t2.num))).value = '';
        }
        if (doIt) {
          this.final.push(
            {
              type : t2.type.toUpperCase(),
              id : String(t2.num),
              value : (t2.type === 'date') ? value.year + '-' + value.month + '-' + value.day : value
            }
          );
        }
      }
      localStorage.setItem('protocol', JSON.stringify(this.final));
    }
  }

  setData(fields) {
    fields.forEach(element => {
      if (element.type == 'DATE' || element.type == 'STRING') {
         this.temp[8] = {year : 2019, month: 5, day : 5};
      }

    });
  }

  saveForm(email) {
    const localProtocol = localStorage.getItem('protocol');

    if (localProtocol !== null && localProtocol !== undefined) {
      const protocole = {
        'protocol' : {
            'fields' : JSON.parse(localProtocol),
            'userID' : 'test@test.ca',
            'formUUID': '6a01cac1-f55e-4933-b889-ae00d14c9d17'
        },
        'relatedUserId': email
      };
      console.log(protocole);
      console.log(this.temp);

      this.protocolService.createProtocol(protocole).subscribe(
        data => {
          alert('Your protocol has been successfully saved.');
        }
      );
    } else {
      alert('Problem with saving protocol');
    }
  }
}
