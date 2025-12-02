import ID_FIELD from '@salesforce/schema/Case.Id';
import INTERNAL_COMMENT_FIELD from '@salesforce/schema/Case.Internal_Comment__c';
import PRIORITY_FIELD from '@salesforce/schema/Case.Priority';
import STATUS_FIELD from '@salesforce/schema/Case.Status';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';
import { LightningElement, api, wire } from 'lwc';

const FIELDS = [STATUS_FIELD, PRIORITY_FIELD, INTERNAL_COMMENT_FIELD];

export default class QuickCaseUpdate extends LightningElement {
    @api recordId;

    status;
    priority;
    internalComment;

    statusOptions = [
        { label: 'New', value: 'New' },
        { label: 'Working', value: 'Working' },
        { label: 'Escalated', value: 'Escalated' },
        { label: 'Closed', value: 'Closed' },
    ];

    priorityOptions = [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' },
    ];

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredCase({ error, data }) {
        if (data) {
            this.status = data.fields.Status.value;
            this.priority = data.fields.Priority.value;
            this.internalComment = data.fields.Internal_Comment__c.value;
        } else if (error) {
            console.error(error);
        }
    }

    handleStatusChange(event) {
        this.status = event.detail.value;
    }

    handlePriorityChange(event) {
        this.priority = event.detail.value;
    }

    handleCommentChange(event) {
        this.internalComment = event.detail.value;
    }

    async handleSave() {
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.recordId;
        fields[STATUS_FIELD.fieldApiName] = this.status;
        fields[PRIORITY_FIELD.fieldApiName] = this.priority;
        fields[INTERNAL_COMMENT_FIELD.fieldApiName] = this.internalComment;

        const recordInput = { fields };

        try {
            await updateRecord(recordInput);
            // Later you can add a toast here if you want
        } catch (error) {
            console.error(error);
        }
    }
}
