# Salesforce DX Project: Next Steps

Now that you’ve created a Salesforce DX project, what’s next? Here are some documentation resources to get you started.

## How Do You Plan to Deploy Your Changes?

Do you want to deploy a set of changes, or create a self-contained application? Choose a [development model](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models).

## Configure Your Salesforce DX Project

The `sfdx-project.json` file contains useful configuration information for your project. See [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the _Salesforce DX Developer Guide_ for details about this file.

## Read All About It

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)







# Date 22.01.2024

## Creating Template for sign up:
Here I used onchange=function name. Onchange function used for a JS listener. When I input some word from the keyboard, this function automatically is called. 
Here I used a div, where I show error messages for a email is exist or not

 ```html
 <template>
    <lightning-card>
        <div class="slds-grid slds-wrap">
            <div class="slds-form-element">
                <lightning-input label="First Name" value="" onchange={fristNamefunc} ></lightning-input>
            </div>
            <div class="slds-form-element">
                <lightning-input label="Last Name" value="" onchange={lastNamefunc} required></lightning-input>
            </div>
            <div class="slds-form-element">
                <lightning-input label="Email" value="" onchange={emailfunc} required></lightning-input>
                <div class="error">{emailError}</div>
            </div>
            <div class="slds-form-element">
                <lightning-input label="Password" type="password" value="" onchange={passfunc1} required></lightning-input>
            </div>
            <div class="slds-form-element">
                <lightning-input label="Confirm Password" type="password" value="" onchange={passfunc2} required></lightning-input>
            </div>
            <div class="slds-form-element slds-p-top_large ">
                <lightning-button label="Sign Up" variant="brand" onclick={insertContactAction}></lightning-button>
            </div>
        </div>
    </lightning-card>
</template>
```

## Create JS file for this task:

Here I used @track keyword for  throw value  form js at emailError. Here is insertContarct function for creating Contact, Account and User.


```js
    import isEmailExist from '@salesforce/apex/ContactController.isEmailExist';
    import createContact from '@salesforce/apex/ContactController.createContact';
    import createAccount from '@salesforce/apex/AccountController.AccountCreator';
    import createUser from '@salesforce/apex/UserController.createUser';
    import { LightningElement, track } from 'lwc';
    export default class Signup extends LightningElement {
        @track emailError;
        firstName = '';
        lastName = '';
        email = '';
        pass1 = '';
        pass2 = '';
        firstNamefunc(event){
            this.firstName = event.target.value
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
            emailError = ''
            isEmailExist({email: this.email})
            .then(res => {
                if (!res){
                    createAccount({accName: this.lastName})
                    .then(accountID => {
                        if (accountID){
                            createContact({fname: this.firstName, lname: this.lastName, email: this.email, accountID: accountID})
                            .then((contactId)=>{
                                createUser({fname: this.firstName, lname: this.lastName, email: this.email})
                                .then(()=>{
                                    console.log('user created')
                                })
                                .catch(err => {
                                    console.log('user create an error', err);
                                })
                            })
                            .catch(err=>{
                                console.log(err)
                            });
                        }
                    })
                    .catch(err => {
                        console.log('account create error')
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

```

## Make apex class with function for control account and contact:


### Contact Controller:

Here I used createContact method for create a contact by Account ID. And here I used isEmailExist for checking an email is in our database or not, this function return true or false.
```apex
    public with sharing class ContactController {
        @AuraEnabled
        public static string createContact(String fname, String lname, String email, String accountID){
            Contact con = new Contact();
            con.FirstName = fname;
            con.LastName = lname;
            con.Email = email;
            con.AccountId = accountID;
            INSERT con;
            List<Contact> conArry = [SELECT Id FROM Contact WHERE Email=:email];
            return conArry[0].Id;
        }

        @AuraEnabled
        public static boolean isEmailExist(String email){
            List<Contact> conList = new List<Contact>();
            conList = [Select Id, Name From contact Where email = :email];
            return !conList.isEmpty();    
        }
    }
```
### Account controller:

Here I used AccountCreator method for create an Account. Here previous condition is: if in the dataset has accName, so did not create an Account, just return ID or Account. Otherwise here creating an account and return its ID.

```apex
    public with sharing class AccountController {
        @AuraEnabled
        public static string AccountCreator(String accName){
            List<Account> accArry = [SELECT Id FROM Account WHERE Name=:accName];
            if (accArry.isEmpty()){
                Account acc = new Account();
                acc.Name = accName;
                INSERT acc;
            }
            accArry = [SELECT Id FROM Account WHERE Name=:accName];
    
            return accArry[0].Id;
        }
    }

```
### User Controller:

Here I used a createUser method for create an User according to System Administrator.

```apex
    public with sharing class UserController {
        @AuraEnabled
        public static void createUser(String fname, String lname, String email){
            Profile p = [SELECT Id FROM Profile WHERE Name='System Administrator' limit 1];
            User usr = new User();
            usr.FirstName = fname;
            usr.LastName = lname;
            usr.username = email;
            usr.Email = email;
            //usr.ContactId = conId;
            usr.Alias = lname;
            usr.LocaleSidKey = 'en_US';
            usr.TimeZoneSidKey = 'GMT';
            usr.ProfileID = p.Id;
            usr.LanguageLocaleKey = 'en_US';
            usr.EmailEncodingKey = 'UTF-8';
            INSERT usr;
        }
    }

```
## Trigger for sending after user create:
Here is a trigger for User. When finished creating a user record, that time calls this trigger for sending a successful email to the user. 
```apex
    trigger UserTrigger on User (after insert) {
     // Access all emails in the list
        List<Messaging.SingleEmailMessage> mailList =  new List<Messaging.SingleEmailMessage>();


        for (User usr : Trigger.new) {
        if (usr.Email != null && usr.FirstName != null) {
    
        // initialize the single send email id object
        Messaging.SingleEmailMessage newMail = new Messaging.SingleEmailMessage();
    
        // Specify who receives the email
        List<String> sendToAddressesList = new List<String>();
    
        sendToAddressesList.add(usr.Email);
    
        newMail.setToAddresses(sendToAddressesList);
    
            // Set the attributes of the email.
        newMail.setSubject('Your User and Contace with Account detail have been added');
    
        String body = 'Hello ' + usr.FirstName + ', ';
        body += 'Your details have been added and your contact has been created.';    
        newMail.setHtmlBody(body);
    
        // Add the email to the list
        mailList.add(newMail);
        }
    }
    // Send all emails in the list
    Messaging.sendEmail(mailList);
    }

```

# Date 25.01.2024


## Task: 
Making add row system dynamically and insert all rows by one clicked.


## Approach:
To create a parent LWC for showing a row, it has some fields, add(+) button, and submit button. When clicking the add(+) button dynamically creates another row, that time actually calls a child LWC. When clicking on submit button, save all rows in Contact according to Account name. 
To The parent LWC. Where I control insert all rows for child LWC.

To parent JS file received all child rows by oninputchange event


## Parent HTML file:

Here I used a for loop for dynamically creating a row/child, and I used an oninputchange event for receiving child data. And here I used the add(+) button for creating another child/row. 

```html
    <template>
        <lightning-card title="Signup Form" class="slds-card">
            <div class="slds-form slds-m-around_large">
                <div class="slds-form__row">
                    <div class="slds-form-element slds-m-around_small">
                        <lightning-input label="First Name" value={firstName} onchange={firstNamefunc}></lightning-input>
                    </div>
                    <div class="slds-form-element slds-m-around_small">
                        <lightning-input label="Last Name" value={lastName} onchange={lastNamefunc} required></lightning-input>
                    </div>
                    <div class="slds-form-element slds-m-around_small">
                        <lightning-input label="Email" value={email} onchange={emailfunc} required></lightning-input>
                        <div class="error">{emailError}</div>
                    </div>
                    <div class="slds-form-element slds-m-around_small">
                        <lightning-input label="Password" type="password" value={pass1} onchange={passfunc1} required></lightning-input>
                    </div>
                    <div class="slds-form-element slds-m-around_small">
                        <lightning-input label="Confirm Password" type="password" value={pass2} onchange={passfunc2} required></lightning-input>
                    </div>
                </div>

                <template for:each={children} for:item="child">
                    <c-child-signup key={child.key} childkey={child.key} oninputchange={handleChildInputChange}></c-child-signup>
                </template>

                
                <div class="slds-form__row">
                    <div class="slds-form-element slds-m-around_small">
                        <lightning-button label="Add row" variant="brand" title="Add Child" onclick={handleAddChild}></lightning-button>
                    </div>
                    <div class="slds-form-element slds-m-around_small">
                        <lightning-button label="Submit" variant="success" onclick={insertContactAction}></lightning-button>
                    </div>
                </div>
            </div>
        </lightning-card>
    </template>


```

## Parent JS File:
Here I used the handleAddChild function to handle the add(+) button. Basically here i create a list for all children or number of add(+) buttons clicked.

Here handleChiledInputChange funcing basically sore values specific child/row fields in  children list.

insertContactAction function used to insert all rows in the database by submit button.

inset function inserts all fields by specific child. This function is called from insertContactAction. 

Here 

```JS
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
```

## Child HTML
Here all fields of a row. And here i used a condition isRemove, Basically i check whom child want ot removed.

```html
    <template>
        <template if:false={isRemove}>
            <div class="slds-form__row">
                <div class="slds-form-element slds-m-around_small">
                    <lightning-input label="First Name" value={firstName} onchange={handleInputChange}></lightning-input>
                </div>
                <div class="slds-form-element slds-m-around_small">
                    <lightning-input label="Last Name" value={lastName} onchange={handleInputChange} required></lightning-input>
                </div>
                <div class="slds-form-element slds-m-around_small">
                    <lightning-input label="Email" value={email} onchange={handleInputChange} required></lightning-input>
                    <div class="error">{emailError}</div>
                </div>
                <div class="slds-form-element slds-m-around_small">
                    <lightning-input label="Password" type="password" value={pass1} onchange={handleInputChange} required></lightning-input>
                </div>
                <div class="slds-form-element slds-m-around_small">
                    <lightning-input label="Confirm Password" type="password" value={pass2} onchange={handleInputChange} required></lightning-input>
                </div>
                <div class="slds-form-element slds-m-around_small slds-p-top_large">
                    <lightning-button label="-" variant="destructive" title="Remove Child" onclick={handleRemoveChild}></lightning-button>
                </div>
            </div>
        </template>
    </template>
```

## Child JS File


Here I am getting child key by childkey using @api technology, for identifying all children. handleInputChange function received all data from html fields.

And I create a custom event which is  'inputchange' sending child data into the parent.
Here handleRemoveChild function is a handler that handles which child is showing or hiding.

```js
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

```
## Output:

![Screenshot (1)](https://github.com/shuvo881/SalesForce-Practices/assets/68312838/a8c472e1-4efb-446d-a996-a17ad49f3671)
