declare var require: any;
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
  
  data = require('../../../jsonDir/protocole-schema-quebec.json');

  titles = [{id:1,title: 'gkdgjkf'},{id:2,title: 'gffgg'}];
  temp = {};
  final = [];

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
          type : t2.type,
          num : t2.num,
          value : value
        }
      );
    }
    console.log(this.final);
  }

  saveForm() {
    alert('bup');
  }
}