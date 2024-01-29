import { LightningElement } from 'lwc';
import retriveAccounts from '@salesforce/apex/AccountController.getAccounts';

const columns = [
    { label: 'ID', fieldName: 'id' },
    { label: 'Name', fieldName: 'name', type: 'text' },
    { label: 'Email', fieldName: 'email', type: 'phone' },
    { label: 'Gender', fieldName: 'gender', type: 'text' },
    { label: 'Contact', fieldName: 'contact', type: 'text' },
    { label: 'Availabilty', fieldName: 'isActive', type: 'text' },

    
];

const accountsCol = [
    { label: 'ID', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name', type: 'text' }

    
];

export default class FirstComp extends LightningElement {
    id = 1;
    name = 'GM Shuvco';
    email = 'golammm@example.com';
    phone_number = '0180001112'
    arr = [1, 2, 3, 4];
    get big(){
        let a = 5;
        let b = 2;
        return a > b ? true : false;
    }
    // person object details
    persons = [
        {
            id: 10,
            name: 'shuvo 1',
            email: 'gol@xyz.com',
            gender: 'Male',
            contact: '0178544',
            isActive: true,
        },
        {
            id: 11,
            name: 'shuvo 2',
            email: 'gol@xyz.com',
            gender: 'Male',
            contact: '0178544',
            isActive: false,
        },
        {
            id: 12,
            name: 'shuvo 3',
            email: 'gol@xyz.com',
            gender: 'Male',
            contact: '0178544',
            isActive: true,
        }
    ]
    data = [];
    columns = columns;

    data2 = []
    columns2 = accountsCol

    
    connectedCallback() {
        
        this.data = this.persons;
        retriveAccounts().then((accs) => {
            this.data2 = accs
        });

    }
    
}