import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventComponent} from './layout/create-event/create-event.component';

const routes: Routes = [
    { path: 'create-event', component: CreateEventComponent }
];

@NgModule({
    exports: [ RouterModule ],
    imports: [ RouterModule.forRoot(routes) ]
})
export class CreateEventRootingModule { }
