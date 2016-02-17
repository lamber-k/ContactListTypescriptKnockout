import * as ko from 'knockout';

import {RegisterComponent} from 'modules/contacts/viewmodels/contacts';
import {ContactFillerService} from 'core/services/contacts';

class Boot {
    contactService: ContactService = new ContactFillerService();

    run(): void {
        RegisterComponent();
        ko.applyBindings(this);
    }
}

var boot = new Boot();
boot.run();