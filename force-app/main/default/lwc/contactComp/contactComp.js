import { LightningElement, api, wire } from 'lwc';
import createAccount from '@salesforce/apex/AccountController.makeClient';


export default class ContactComp extends LightningElement {
    @api recordId
    lastName = ''
    inputLastName(event){
        this.lastName = event.target.value
    }


    createAccount(){
        createAccount({accId: this.recordId, lname: this.lastName})
        .then(res => {
            console.log('succss', res);
        })
        .catch(err => {
            console.log('an error: ', err);
        });
    }
}