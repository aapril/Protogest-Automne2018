declare var require: any;
import {Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import { ProtocolService } from '../../shared/services/protocol.service';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { MatStepper } from '@angular/material';
import { environment } from "../../../environments/environment";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "app-create-event",
    templateUrl: "./create-event.component.html",
    styleUrls: ["./create-event.component.scss"]
})
export class CreateEventComponent implements OnChanges {
  @Input() Protocol: string;
  @Input() selectedSections: any = []
  @Input() parentStepper: MatStepper

  public readonly QUEBEC_BUTTON_VALUE: string = "quebec";
  public readonly CANADA_BUTTON_VALUE: string = "canada";

  data = require('../../../jsonDir/protocole-schema-quebec.json');

  protocolSchemas: any

  temp = {};
  final: any = [];
  occupiedDates: any = [];

  constructor(private protocolService: ProtocolService, protected http: HttpClient, @Inject(DOCUMENT) document) {}


  isDisabled(date: NgbDateStruct) {
    // The localStorage is set in the CreateProtocolComponent
    if (localStorage.getItem("occupiedDates") !== null) {
        const testoccupiedDates = localStorage.getItem("occupiedDates");
        return (
            testoccupiedDates.indexOf(
                date.year +
                    "-" +
                    (date.month < 10 ? "0" + date.month : date.month) +
                    "-" +
                    (date.day < 10 ? "0" + date.day : date.day)
            ) > -1
        );
    } else {
        return false;
    }
  }

  ngOnInit() {
    this.http
        .get(environment.backendUrl + "/protocol-schemas")
        .subscribe(response => {
            if (!response) {
                throw new Error("Failed to communicate with server");
            }
            this.protocolSchemas = response;
            this.data = {
                protocole: [
                    this.protocolSchemas.filter(p => {
                        return p.name.toLowerCase().includes("quebec");
                    })[0]
                ]
            };
        });
  }

    ngOnChanges(changes: SimpleChanges) {
        if (this.Protocol == 'canada') {
            this.data = require('../../../jsonDir/protocole-schema-canada.json');
        } else {
            this.data = require('../../../jsonDir/protocole-schema-quebec.json');
        }
      }

    // ngOnChanges(changes: SimpleChanges) {
    //     this.data = {
    //         protocole: [
    //             this.protocolSchemas.filter(p =>
    //                 p.name.toLowerCase().includes(this.Protocol)
    //             )[0]
    //         ]
    //     };
    // }

    onChange(t2, value) {
        // The localStorage is set in the CreateProtocolComponent
        if (localStorage.getItem("occupiedDates") !== null) {
            this.occupiedDates = localStorage.getItem("occupiedDates");
            localStorage.removeItem("occupiedDates");
        }
        if (t2.type.toUpperCase() !== "BOOL") {
            let update = false;
            for (let i = 0; i < this.final.length; i++) {
                const obj = this.final[i];

                if (obj.num == t2.num) {
                    update = true;
                    if (this.final[i].type == "date") {
                        if (
                            this.occupiedDates.indexOf(
                                value.year +
                                    "-" +
                                    (value.month < 10
                                        ? "0" + value.month
                                        : value.month) +
                                    "-" +
                                    (value.day < 10
                                        ? "0" + value.day
                                        : value.day)
                            ) > -1
                        ) {
                            this.final[i].value =
                                value.year +
                                "-" +
                                value.month +
                                "-" +
                                value.day;
                        } else {
                            console.log(t2);
                            alert(
                                "This date is already occupied in your calendar."
                            );
                            (<HTMLInputElement>(
                                document.getElementById(t2.type.concat(t2.num))
                            )).value = "";
                        }
                    } else {
                        this.final[i].value = value;
                    }
                }
            }

            if (!update) {
                let doIt = true;
                if (
                    t2.type === "date" &&
                    this.occupiedDates.indexOf(
                        value.year +
                            "-" +
                            (value.month < 10
                                ? "0" + value.month
                                : value.month) +
                            "-" +
                            (value.day < 10 ? "0" + value.day : value.day)
                    ) > -1
                ) {
                    doIt = false;
                    alert("This date is already occupied in your calendar.");
                    (<HTMLInputElement>(
                        document.getElementById(t2.type.concat(t2.num))
                    )).value = "";
                }
                if (doIt) {
                    this.final.push({
                        type: t2.type.toUpperCase(),
                        id: String(t2.num),
                        value:
                            t2.type === "date"
                                ? value.year +
                                  "-" +
                                  value.month +
                                  "-" +
                                  value.day
                                : value,
                        desc: t2.desc
                    });
                }
            }
            localStorage.setItem("protocol", JSON.stringify(this.final));
        }
    }

    setData(fields) {
        fields.forEach(element => {
            if (element.type == "DATE" || element.type == "STRING") {
                this.temp[8] = { year: 2019, month: 5, day: 5 };
            }
        });
    }

    saveForm(email, protocol) {
        this.http
            .get(environment.backendUrl + "/protocol-schemas")
            .subscribe(response => {
                if (!response) {
                    throw new Error("Failed to communicate with server");
                }
                this.protocolSchemas = response;
                var uuid = this.protocolSchemas.filter(p =>
                    p.name.toLowerCase().includes(protocol)
                )[0]["uuid"];

                const localProtocol = localStorage.getItem("protocol");
                let today = new Date();
                const dd = String(today.getDate()).padStart(2, "0");
                const mm = String(today.getMonth() + 1).padStart(2, "0");
                const yyyy = today.getFullYear();
                today = new Date(mm + "/" + dd + "/" + yyyy);

                if (localProtocol !== null && localProtocol !== undefined) {
                    const protocole = {
                        protocol: {
                            fields: JSON.parse(localProtocol),
                            userID: "test@test.ca",
                            formUUID: "6a01cac1-f55e-4933-b889-ae00d14c9d17",
                            creationDate: today,
                            protocolUuid: uuid
                        },
                        relatedUserId: email
                    };

                    this.protocolService
                        .createProtocol(protocole)
                        .subscribe(data => {
                            alert("Your protocol has been successfully saved.");
                        });
                } else {
                    alert("Problem with saving protocol");
                }
            });
    }

  getSectionsToDisplay(){
    let toDisplay = []

    this.data.protocole[0].protocol_fields.forEach(section => {
      // If selectedSubsections contains a subSection listed in this section
      if(section.subSection.map(subSection => subSection.num).some(number => this.selectedSections.includes(number))) {
        toDisplay.push(section);
      }
    })

    return toDisplay;
  }

  getSubSectionsToDisplay(currentSection) {
    let that = this;
    return currentSection.subSection.filter(subSection => that.selectedSections.find(selected => selected === subSection.num))
  }

  nextStep(stepper: MatStepper) {
    if(stepper.selectedIndex === stepper.steps.length - 1) {
      this.parentStepper.next();
    } else {
      stepper.next();
    }
  }

  previousStep(stepper: MatStepper) {
    if(stepper.selectedIndex === 0) {
      this.parentStepper.previous();
    } else {
      stepper.previous();
    }
  }
}
