import {Component, OnInit } from '@angular/core';
import { EventService } from '../../shared/services/event.service';
import { CreateEvent } from './create-event';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent{

  titles = [{id:1,title: 'gkdgjkf'},{id:2,title: 'gffgg'}];
  temp = {};
  final = [];
  saveForm(){ 
      console.log(this.final);
   }
   onChange(t2,value){
    var update = false;
    for(var i = 0; i < this.final.length; i++) {
      var obj = this.final[i];

      if(obj.num == t2.num){
        update = true;
        this.final[i].value = value;
      }
    }

    if(!update){
      this.final.push(
        {
          type : t2.type,
          num : t2.num,
          value : value
        }
      );
    }
    
   }

 data = {
    "_comments": "Assumer que tous les champs sont des OUI/NON à part si indiquer autrement par le champ 'type' (Assume all fields are YES/NO question except if specified otherwise in the field 'type'",
    "protocole": [
        {
            "description": "Protocole d'instance du Québec",
          
            "protocol_fields": [
                {
                    "sectionID" : "1",
                    "sectionName": "Preliminary Exceptions",
                    "subsection" : [
                      {
                        "num" : 7,
                        "desc": "Declinatory Exceptions",
                        "type" : "bool",
                        "dateSection": [
                          {
                            "num" : 8,
                            "desc" : "Referral to competent court or dismissal",
                            "type" : "date"
                          },
                          {
                            "num" : 9,
                            "desc" : "Other Exception",
                            "type" : "date"
                          },
                          {
                            "num" : 10,
                            "desc" : "Submitted By",
                            "type": "string"
                          }
                        ]
                      },
                      {
                        "num" : 11,
                        "desc" : "Exception to Dismiss",
                        "type": "bool",
                        "dateSection": [
                          {
                            "num" : 12,
                            "desc" : "Dismissal",
                            "type" : "date"
                          },
                          {
                            "num" : 13,
                            "desc" : "Submitted By",
                            "type": "string"
                          }
                        ]
                      },
                      {
                        "num" : 14,
                        "desc" : "Other preliminary Exceptions",
                        "type" : "bool",
                        "dateSection": [
                          {
                            "num" : 15,
                            "desc" : "Clarifications Regardings",
                            "type" : "date"
                          },
                          {
                            "num" : 16,
                            "desc" : "Disclosure of documents",
                            "type" : "date"
                          },
                          {
                            "num" : 17,
                            "desc" : "Striking of immaterial allegations",
                            "type" : "date"
                          },
                          {
                            "num" : 18,
                            "desc" : "Requirements to provide suretyship",
                            "type" : "date"
                          },
                          {
                            "num" : 19,
                            "desc" : "Other exceptions ( indicate its nature)",
                            "type" : "string"
                          },
                          {
                            "num" : 20,
                            "desc" : "Submitted By",
                            "type": "string"
                          }
                        ]
                      },
                      {
                        "num" : 21,
                        "desc" : "Application under 51 art ccp",
                        "type": "bool",
                        "dateSection": [
                          {
                            "num" : 22,
                            "desc" : "Application under 51 art ccp",
                            "type" : "date"
                          },
                          {
                            "num" : 23,
                            "desc" : "Submitted By",
                            "type": "string"
                          }
                        ]
                      },

                    ]
                },
                {
                    "sectionID" : "2",
                    "sectionName" : "Other Proceedings",
                    "subsection" : [
                      {
                        "num" : 24,
                        "desc": "Safeguard Measures",
                        "type" : "bool",
                        "dateSection": [
                          {
                            "num" : 25,
                            "desc" : "Application for safeguard measures",
                            "type" : "date"
                          },
                          {
                            "num" : 26,
                            "desc" : "Submitted By",
                            "type": "string"
                          }
                        ]
                      },
                      {
                        "num" : 27,
                        "desc": "Other incidental procedures",
                        "type" : "bool",
                        "dateSection": [
                          {
                            "num" : 28,
                            "desc" : "Amendment of a pleading",
                            "type" : "date"
                          },
                          {
                            "num" : 29,
                            "desc" : "Determination of an issue of law",
                            "type" : "date"
                          },
                          {
                            "num" : 30,
                            "desc" : "Declaration of disqualification",
                            "type" : "date"
                          },
                          {
                            "num" : 31,
                            "desc" : "Other",
                            "type" : "date"
                          },
                          {
                            "num" : 32,
                            "desc" : "Submitted By",
                            "type": "string"
                          }
                        ]
                      }]
                },
              
            ]
        }
    ]
}


}