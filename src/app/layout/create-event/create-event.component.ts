declare var require: any;
import {Component, OnInit } from '@angular/core';
import { ProtocolService } from '../../shared/services/protocol.service';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})


export class CreateEventComponent{
  
  constructor(private protocolService: ProtocolService, protected http: HttpClient, private route: ActivatedRoute) {}

  testModelDate = "2019-08-08";
  data = require('../../../jsonDir/protocole-schema-quebec.json');
  temp = {}; 
  final: any = [];
  create = true;
  protocoleId  = "";
  ngOnInit() {
    this.route.queryParams.subscribe((params)=> {
      if(params['id']){
        this.protocoleId = params['id'];
        this.loadData();
        this.create = false;
      } else {
        this.temp = {};
        this.create = true;
      }
    });
  };

  loadData() {
    this.protocolService.getProtocolByUUID(this.protocoleId).subscribe(
      data2 => {
          console.log(data2);
          data2.fields.forEach(element => {
            if(element.type == "DATE" || element.type == "STRING"){
              this.temp[element.id] = element.value;
              this.final.push(
              {
                type : element.type,
                id : element.id,
                value : element.value
              }
              );
            }
          });
      }
    );
   
  }

  onChange(t2, value,event){
    if(event){
     value = event.target.value;
    }
      var update = false;
      for(var i = 0; i < this.final.length; i++) {
        var obj = this.final[i];
        if(obj.id == t2.num){
          update = true;
          if(this.final[i].type == "date"){
            if (typeof value === "string"){
              this.final[i].value = value;
            }else{
             this.final[i].value = value.year + "-" + value.month + "-" + value.day;
            }
            
          }else{
            this.final[i].value = value;
          }
          
        }
      }

      if(!update){
        this.final.push(
          {
            type : t2.type.toUpperCase(),
            id : String(t2.num),
            value : (t2.type === "date" && typeof value != "string") ? value.year + "-" + value.month + "-" + value.day : value
          }
        );
      }
      console.log(this.final);
      localStorage.setItem('protocol', JSON.stringify(this.final));
    
  }
  

  saveForm() {
    if( this.protocoleId == ""){
      this.protocoleId = "6a01cac1-f55e-4933-b889-ae00d14c9d17";
    }
    var localProtocol = localStorage.getItem('protocol');

    if (localProtocol !== null && localProtocol !== undefined) {
      var protocole = {
        "protocol" : {
            "fields" : JSON.parse(localProtocol),
            "userID" : "test@test.ca",
            "formUUID": this.protocoleId
        },
        "relatedUserId": "bob@bob.ca"
      } 
      console.log("protocle sent");
      console.log(protocole);
      
      if(this.create){
      this.protocolService.createProtocol(protocole).subscribe(
        data => {
          alert('Your protocol has been successfully saved.');
        }
      );
      }else{
        this.protocolService.updateProtocol(protocole,this.protocoleId).subscribe(
          data => {
            alert('Your protocol has been successfully saved.');
          }
        );
      }
      
    } else {
      alert('Problem with saving protocol');
    }
  }
}