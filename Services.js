class ContactService {
    constructor() {
      const storedContacts = localStorage.getItem('contacts');
      this.contacts = storedContacts ? JSON.parse(storedContacts) : [];
    }
    updateStorage() {
      localStorage.setItem('contacts', JSON.stringify(this.contacts));
    }
    saveContact(details) {
      details.id = this.generateUniqueId();
      this.contacts.push(details);
      this.updateStorage(); 
      alert('Contact added successfully');
      return details;
    }
    
    updateContact(updatedContact) {
      this.contacts = this.contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      );
      this.updateStorage();
      alert('Contact updated successfully');
      return true;
    }
    deleteContact(contact) {
      this.contacts = this.contacts.filter((elem) => elem.id !== contact.id);
      this.updateStorage();
      alert('Contact deleted successfully');
      return true;
    }
    getContacts() {
      return this.contacts;
    }
    getContactById(id) {
      return this.contacts.find((contact) => contact.id === id);
    }
    generateUniqueId() {
      let idCounter = Number(localStorage.getItem('idCounter'));
      idCounter = idCounter ? idCounter : 0;
      idCounter++;
      localStorage.setItem('idCounter', idCounter.toString());
      return idCounter.toString();
    }
}
