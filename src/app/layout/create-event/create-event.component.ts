declare var require: any;
import {Component, OnInit } from '@angular/core';
import { ProtocolService } from '../../shared/services/protocol.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})


export class CreateEventComponent{
  
  constructor(private protocolService: ProtocolService, protected http: HttpClient) {}


  data = require('../../../jsonDir/protocole-schema-quebec.json');

  temp = {};
  final: any = [];

  onChange(t2, value){
    var update = false;
    for(var i = 0; i < this.final.length; i++) {
      var obj = this.final[i];

      if(obj.num == t2.num){
        update = true;
        if(this.final[i].type == "date"){
          this.final[i].value = value.year + "-" + value.month + "-" + value.day;
        }else{
          this.final[i].value = value;
        }
        
      }
    }

    if(!update){
      this.final.push(
        {
          type : t2.type.toUpperCase(),
          num : t2.num,
          value : value
        }
      );
    }
    localStorage.setItem('protocol', JSON.stringify(this.final));
  }

  saveForm() {
    var localProtocol = localStorage.getItem('protocol');

    if (localProtocol !== null && localProtocol !== undefined) {
      var protocole = {
        "relatedUserId" : "t@t.com",
        "protocol" : {
            "fields" : JSON.parse(localProtocol)
        }
      } 
      console.log(protocole);
      
      this.protocolService.createProtocol(protocole).subscribe(
        data => {
          console.log(data);
        }
      );
  ;
    } else {
      alert('Problem with saving protocol');
    }
  }
}