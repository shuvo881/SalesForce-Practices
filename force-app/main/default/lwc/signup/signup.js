import isEmailExist from '@salesforce/apex/ContactController.isEmailExist';
import createContact from '@salesforce/apex/ContactController.createContact';
import createAccount from '@salesforce/apex/AccountController.accountCreator';
import createUser from '@salesforce/apex/UserController.createUser';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


import { LightningElement, track } from 'lwc';

export default class Signup extends LightningElement {
    @track emailError = '';
    @track children = [];
    firstName = '';
    lastName = '';
    email = '';
    pass1 = '';
    pass2 = '';
    inputString = 'Hi i am parent';
    firstNamefunc(event){
        this.firstName = event.target.value
        //console.log(this.firstName)
    }
    lastNamefunc(event){
        this.lastName = event.target.value
    }
    emailfunc(event){
        this.email = event.target.value
    }
    passfunc1(event){
        this.pass1 = event.target.value
    }
    passfunc2(event){
        this.pass2 = event.target.value
    }


    insertContactAction(){
        console.log(this.children.length)
        
        this.insert(this.firstName, this.lastName, this.email, this.pass1, this.pass2);

        this.children.forEach(child => {
            if (child.values.childkey){
                this.insert(child.values.firstName, child.values.lastName, child.values.email, child.values.pass1, child.values.pass2);
            }
        });
        
        this.children = []
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.pass1 = '';
        this.pass2 = '';

        const event = new ShowToastEvent({
            title: 'Success!',
            message:
                'All data saved.',
        });
        this.dispatchEvent(event);
        
    }
    i = 1
    addToCard(){
        console.log(this.i);
        let linput = document.createElement('div');
        linput.innerHTML = `<h1 style='background: red;'>Hell</h1>`;
        this.template.querySelector('.rowClass').appendChild(linput);
        this.i += 1
    }
    addInput() {

        let linput = document.createElement('div');
        linput.innerHTML = "<h1 style='background: red;'>Hello World"+this.i+"</h1>";
        this.template.querySelector('.container').appendChild(linput);
    }
    @track childMessages = [];
    

    handleAddChild() {
        const key = Date.now().toString();
        this.children = [
            ...this.children,
            { key, values: { firstName: '', lastName: '', email:'', pass1:'', pass2:''} }
        ];
    }

    handleChildInputChange(event) {
        
        // console.log('Key',event.detail.key)
        // console.log('removed op',event.detail.isRemove)
        const key  = event.detail.childkey;
        if (event.detail.isRemove){
            this.children.forEach((child, index) => {
                if(child.values.childkey == undefined && event.detail.childkey==child.key){
                    this.children.splice(index, 1);   
                    return
                }
                if(child.values.childkey == event.detail.childkey){
                    console.log('beffore delete lenght = ', this.children.length)
                    this.children.splice(index, 1);
                    console.log('affter delete lenght = ', this.children.length)
                    return
                }
                
            });
            console.log('removed clicked')
            return;
        }
        const updatedChildren = this.children.map(child => {
            
            if (child.key === key) {
                return { ...child, values: event.detail };
            }
            return child;
        });
        this.children = updatedChildren;
        console.log(this.children.length)
        
    }


    insert(fname, lname, email, pass1, pass2){
        isEmailExist({email: email})
        .then(res => {
            if (!res){
                createAccount({accName: lname})
                .then(accountID => {
                    if (accountID){
                        createContact({fname: fname, lname: lname, email: email, accountID: accountID})
                        .then((contactId)=>{
                            console.log('account and contact created')
                        })
                        .catch(err=>{
                            console.log(err)
                        });
                    }
                })
                .catch(err => {
                    console.log('account create error', err)
                })
                
            }
            else{
                this.emailError = 'The email exist'; 
            }
        })
        .catch(err => {
            console.log('email checking error', err)
        });
    }
    
}