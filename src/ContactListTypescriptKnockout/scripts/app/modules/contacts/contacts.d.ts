interface Contact {
    FirstName: string;
    LastName: string;
    Email: string;
    Telephone: string;
}

interface ContactService {
    GetContacts(): Contact[];
    RemoveContact(contactToRemove: Contact): void;
    AddContact(newContact: Contact): void;
}

interface ContactDetailParam {
    contact: Contact;
}

interface ContactParam {
    contactService: ContactService;
}

interface ContactValidation {
    FirstName: KnockoutObservable<string>;
    LastName: KnockoutObservable<string>;
    Email: KnockoutObservable<string>;
    Phone: KnockoutObservable<string>;
}