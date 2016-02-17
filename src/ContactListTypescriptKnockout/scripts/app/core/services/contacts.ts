export class ContactFillerService implements ContactService {
    ContactList: Array<Contact> = [
        { FirstName: 'Jeremy', LastName: 'CLECH', Email: 'jeremy.clech@accelis-hit.com', Telephone: "0600000000" },
        { FirstName: 'Olivier', LastName: 'MATROT', Email: 'olivier.matrot@accelis-hit.com', Telephone: "0600000000" },
        { FirstName: 'Olivier', LastName: 'MALEA', Email: 'olivier.malea@accelis-hit.com', Telephone: "0600000000" },
        { FirstName: 'Pierre', LastName: 'MATALON', Email: 'pierre.matalon@accelis-hit.com', Telephone: "0600000000" },
        { FirstName: 'Wajdi', LastName: 'GHARIANI', Email: 'wajdi.ghariani@accelis-hit.com', Telephone: "0600000000" }
    ];

    GetContacts(): Contact[] {
        return (this.ContactList);
    }

    AddContact(contact: Contact): void {
        this.ContactList.push(contact);
    }

    RemoveContact(contact: Contact): void {
        var contactIdx = this.ContactList.indexOf(contact);
        this.ContactList.splice(contactIdx, 1);
    }
}