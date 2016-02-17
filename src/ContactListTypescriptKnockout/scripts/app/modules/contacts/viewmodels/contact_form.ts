import * as ko from 'knockout';
import * as validation from 'knockout.validation';
import * as $ from 'jquery';

ko.validation = validation;

export class ContactForm {
    FirstName: KnockoutObservable<string> = ko.observable<string>().extend({ required: true });
    LastName: KnockoutObservable<string> = ko.observable<string>().extend({ required: true });
    Email: KnockoutObservable<string> = ko.observable<string>().extend({ required: true, email: true });
    Phone: KnockoutObservable<string> = ko.observable<string>().extend({ required: true });
    Validation: KnockoutObservable<ContactValidation>

    constructor(private rootContactFormNode: Element) {
        this.Validation = ko.validatedObservable({
            FirstName: this.FirstName,
            LastName: this.LastName,
            Email: this.Email,
            Phone: this.Phone
        });
    }

    public AddNewContact(): void {
        $(document).trigger('newContact', {
            FirstName: this.FirstName(),
            LastName: this.LastName(),
            Email: this.Email(),
            Telephone: this.Phone()
        });
    }
}

export function RegisterComponent(): void {
    if (!ko.components.isRegistered('contact-form')) {
        ko.components.register('contact-form', {
            viewModel: {
                createViewModel: (params?: any, componentInfo?: any) => { return new ContactForm(componentInfo) }
            },
            template: { require: 'text!modules/contacts/views/contact_form.html' }
        });
    }
}
    
