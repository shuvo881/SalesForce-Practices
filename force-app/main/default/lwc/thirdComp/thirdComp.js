import { LightningElement, track, api } from 'lwc';
import CONTACT_OBJECT from "@salesforce/schema/Contact";
import LAST_NAME_FIELD from "@salesforce/schema/Contact.LastName";



const columns = [
    { label: 'Opportunity name', fieldName: 'OpportunityName', type: 'text' },
    {
        label: 'Confidence',
        fieldName: 'Confidence',
        type: 'percent',
        cellAttributes: {
            iconName: { fieldName: 'TrendIcon' },
            iconPosition: 'right',
            class: 'slds-text-color_success slds-text-title_caps',
        },
    },
    {
        label: 'Amount',
        fieldName: 'Amount',
        type: 'currency',
        typeAttributes: { currencyCode: 'EUR', step: '0.001' },
    },
    { label: 'Contact Email', fieldName: 'Contact', type: 'email' },
    { label: 'Contact Phone', fieldName: 'Phone', type: 'phone' },
];


export default class ThirdComp extends LightningElement {
    @api recordId;
    @track data = [
        {
            Id: 'a',
            OpportunityName: 'Cloudhub',
            Confidence: 0.2,
            Amount: 25000,
            Contact: 'jrogers@cloudhub.com',
            Phone: '2352235235',
            TrendIcon: 'utility:down',
        },
        {
            Id: 'b',
            OpportunityName: 'Quip',
            Confidence: 0.78,
            Amount: 740000,
            Contact: 'quipy@quip.com',
            Phone: '2352235235',
            TrendIcon: 'utility:up',
        },
    ];
   
    columns = columns;

    getSelectedName(event) {
        const selectedRows = event.detail.selectedRows;
        // Display that fieldName of the selected rows
        for (let i = 0; i < selectedRows.length; i++) {
            console.log(selectedRows[i].OpportunityName);
            // alert('You selected: ' + selectedRows[i].OpportunityName);
        }
    }

    getSelectedEmail(event) {
        // Display the Contact of the selected rows
        event.detail.selectedRows.forEach((selectedRow) => {
            console.log(selectedRow.Contact);
            // alert('Selected email addresses: ' + selectedRow.Contact);
        });
    }

    accountObject = CONTACT_OBJECT;
    myFields = [LAST_NAME_FIELD,];

    handleAccountCreated() {
        // Run code when account is created.
    }
    connectedCallback(){
        console.log(this.recordId);
    }

    catchval = ''
    contactChangeVal(event){
        this.cachval = event.target.value
    }

    insertContactAction(){
        console.log(this.catchval)
    }
}