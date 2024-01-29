import { LightningElement, api, track } from 'lwc';

export default class ChildSignup extends LightningElement {
    @api childkey;
    @track emailError = '';
    firstName = '';
    lastName = '';
    email = '';
    pass1 = '';
    pass2 = '';
    isRemove = false
    handleInputChange(event){
        if (event){
            if (event.target.label === 'First Name') {
                this.firstName = event.target.value;
            } else if (event.target.label === 'Last Name') {
                this.lastName = event.target.value;
            }else if (event.target.label === 'Email') {
                this.email = event.target.value;
            }else if (event.target.label === 'Password') {
                this.pass1 = event.target.value;
            }else if (event.target.label === 'Confirm Password') {
                this.pass2 = event.target.value;
            }
        }
        this.dispatchEvent(new CustomEvent('inputchange',{
            detail: { 
                isRemove: this.isRemove,
                firstName: this.firstName, 
                lastName: this.lastName,
                email: this.email,
                pass1: this.pass1,
                pass2: this.pass2, 
                childkey: this.childkey
            },
        }))
    }
    handleRemoveChild(){
        
        this.isRemove = true
        this.handleInputChange(false)
        
    }

    connectedCallback(){
    }
}