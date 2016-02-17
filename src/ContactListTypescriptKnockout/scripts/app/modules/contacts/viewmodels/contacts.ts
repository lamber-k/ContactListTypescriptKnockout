import * as ko from 'knockout';
import * as $ from 'jquery';

import {RegisterComponent as RegisterComponentDetails} from 'modules/contacts/viewmodels/contact_details';
import {RegisterComponent as RegisterComponentForm} from 'modules/contacts/viewmodels/contact_form';

export class Contacts {
    Contacts: KnockoutObservableArray<Contact>;

    constructor(private contactService: ContactService) {
        this.Contacts = ko.observableArray(contactService.GetContacts());
        $(document).on('newContact', (event: Event, newContact: Contact) => this.NewContact(newContact));
    }

    private NewContact(newContact: Contact): void {
        this.Contacts.push(newContact);
    }

    private DeleteContact(targetedContact: Contact): void {
        this.Contacts.destroy(targetedContact);
        this.contactService.RemoveContact(targetedContact);
    }

}

export function RegisterComponent() {
    if (!ko.components.isRegistered('contacts')) {
        ko.components.register('contacts', {
            viewModel: { createViewModel: (param: ContactParam) => { return new Contacts(param.contactService); } },
            template: { require: 'text!modules/contacts/views/contacts.html' }
        });
    }
    RegisterComponentDetails();
    RegisterComponentForm();
}