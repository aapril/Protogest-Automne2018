declare var require: any;
import {Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import { ProtocolService } from '../../shared/services/protocol.service';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})


export class CreateEventComponent implements OnChanges {
  @Input() Protocol: string;

  constructor(private protocolService: ProtocolService, protected http: HttpClient, @Inject(DOCUMENT) document) {}

  data = require('../../../jsonDir/protocole-schema-quebec.json');

  temp = {};
  final: any = [];
  occupiedDates: any = [];

  ngOnChanges(changes: SimpleChanges) {
    if (this.Protocol == 'canada') {
        this.data = require('../../../jsonDir/protocole-schema-canada.json');
    } else {
        this.data = require('../../../jsonDir/protocole-schema-quebec.json');
    }
  }
  onChange(t2, value) {
    // The localStorage is set in the CreateProtocolComponent
    if (localStorage.getItem('occupiedDates') !== null) {
      this.occupiedDates = localStorage.getItem('occupiedDates');
      localStorage.removeItem('occupiedDates');
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
