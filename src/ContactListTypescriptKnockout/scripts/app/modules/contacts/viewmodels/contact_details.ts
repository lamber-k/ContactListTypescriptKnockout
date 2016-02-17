import * as ko from 'knockout';

export class ContactDetails {
    Contact: KnockoutObservable<Contact>;

    constructor(contact: Contact) {
        this.Contact = ko.observable(contact);
    }
}

export function RegisterComponent(): void {
    if (!ko.components.isRegistered('contact-details')) {
        ko.components.register('contact-details', {
            viewModel: {
                createViewModel: (params: ContactDetailParam) => { return new ContactDetails(params.contact) }
            },
            template: { require: 'text!modules/contacts/views/contact_details.html' }
        });
    }
}
