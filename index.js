var contactService = new ContactService();
function addContact() {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var mobile = document.getElementById('mobile').value;
  var landline = document.getElementById('landline').value;
  var website = document.getElementById('website').value;
  var address = document.getElementById('address').value;
  let details = {};
 details.name = name;
 details.email = email;
 details.mobile = mobile;
 details.landline = landline;
 details.website = website;
 details.address = address;
 var  contact = new Contact(details);
  contactService.saveContact(contact);
  clearFields();
  closeDialog();
  var contactElement = createContactList(contact);
  var contactList = document.getElementById('contactList');
  contactList.appendChild(contactElement);
}
function updateContact() {
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let mobile = document.getElementById('mobile').value;
  let landline = document.getElementById('landline').value;
  let website = document.getElementById('website').value;
  let address = document.getElementById('address').value;
  let addButton = document.getElementById('addUpdateButton');
  let details = {};
  details.id = document.getElementById('addUpdateButton').dataset.contactId
  details.name = name;
  details.email = email;
  details.mobile = mobile;
  details.landline = landline;
  details.website = website;
  details.address = address;
  let updatedContact = new Contact(details);
  console.log('hfdfhfdjgdhjk',updatedContact)
  contactService.updateContact(updatedContact);
  closeDialog();
  clearFields();
  showFullDetails(addButton?.dataset.contactId ?? '')
  let updatedContactElement = updateContactList(updatedContact);
  let contactList = document.getElementById('contactList');
  let existingContactElement = document.querySelector(`.contact[data-id="${updatedContact.id}"]`);
  console.log('hjjjjjjhhh', existingContactElement)
  if (existingContactElement) {
    contactList.replaceChild(updatedContactElement, existingContactElement);
  }
}
function createContactList(contact) {
  var contactElement = document.createElement('div');
  contactElement.className = 'contact';
contactElement.dataset.id = contact.id;
  var nameElement = document.createElement('div');
  nameElement.className = 'contact-name';
  nameElement.textContent = contact.name;
  contactElement.appendChild(nameElement);
  var emailElement = document.createElement('div');
  emailElement.className = 'contact-email';
  emailElement.textContent = contact.email;
  contactElement.appendChild(emailElement);
  var mobileElement = document.createElement('div');
  mobileElement.className = 'contact-mobile';
  mobileElement.textContent = contact.mobile;
  contactElement.appendChild(mobileElement);
  contactElement.onclick = function () {
    let inactive = document.getElementsByClassName("contact active")[0];
    inactive?.classList?.remove("active");
    inactive = document.querySelector(`[data-id='${contact.id}']`);
    inactive.classList.add("active");
    showFullDetails(contact.id)
  };
  return contactElement;
}
function updateContactList(contact) {
  let updatedContactElement = createContactList(contact);
  updatedContactElement.classList.add('active');
  return updatedContactElement;
}
function addOrUpdateContact() {
  let addButton = document.getElementById('addUpdateButton');
  if (addButton.textContent === 'Update') {
    updateContact();
  } else {
    addContact();
  }
}
function openEditDialog(contact) {
  console.log('nbcjhhvdn',contact)
  document.getElementById('name').value = contact.name;
  document.getElementById('email').value = contact.email;
  document.getElementById('mobile').value = contact.mobile;
  document.getElementById('landline').value = contact.landline;
  document.getElementById('website').value = contact.website;
  document.getElementById('address').value = contact.address;
  document.getElementById('addUpdateButton').textContent = 'Update';
  document.getElementById('addUpdateButton').dataset.contactId = contact.id;
  openDialog();
}
function closeDetailsBox() {
  var fullDetailsBox = document.getElementById('fullDetailsBox');
  fullDetailsBox.innerHTML = '';
}
function displayContact() {
  var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  var existingContacts = contactService.getContacts();
  console.log('Existing Contacts:', existingContacts);
  var contactList = document.getElementById('contactList');
  contactList.textContent = "";
  if (existingContacts) {
    existingContacts.forEach(function (contact) {
      var contactElement = createContactList(contact);
      contactList.appendChild(contactElement);
    });
  }
}
function showFullDetails(id) {
  let contact = contactService.getContactById(id);
  let editButton = document.getElementById('editButton');
  var deleteButton = document.getElementById('deleteButton');
  let fullDetailsBox = document.getElementById("fullDetailsBox");
  fullDetailsBox.classList.add("visible");
  fullDetailsBox.classList.remove("hidden");
  let nameElement = document.getElementById("cname");
  nameElement.textContent = contact.name;
  let emailElement = document.getElementById("cemail");
  emailElement.textContent = "Email:" + contact.email;
  let mobileElement = document.getElementById("cmobile");
  mobileElement.textContent = "Mobile:" + contact.mobile;
  let landlineElement = document.getElementById("clandline");
  landlineElement.textContent = "Landline:" + contact.landline;
  let websiteElement = document.getElementById("cwebsite");
  websiteElement.textContent = "Website:" + contact.website;
  let addressElement = document.getElementById("caddress");
  addressElement.textContent = "Address: " + contact.address;
  editButton.dataset.contactId = contact.id;
  deleteButton.dataset.contactId = contact.id;
}
function editButton() {
  console.log('in eidtbrtnnnnn')
  let editButton = document.getElementById('editButton');
  let contactId = editButton.dataset.contactId;
  let contact = contactService.getContactById(contactId);
  openEditDialog(contact);
}
function deleteButton() {
  let deleteButton = document.getElementById('deleteButton');
  let contactId = deleteButton.dataset.contactId;
  deleteContactById(contactId);
}
window.onload = function () {
  displayContact();
};
function openDialog() {
  var dialogBox = document.getElementById('dialogBox');
  dialogBox.classList.add('dialog-open');
  dialogBox.classList.remove('dialog-closed');
}
function closeDialog() {
  var dialogBox = document.getElementById('dialogBox');
  dialogBox.classList.remove('dialog-open');
  dialogBox.classList.add('dialog-closed');
  document.getElementById('addUpdateButton').textContent = 'Add';
}
function cancelDialog() {
  dialog.classList.add("hidden");
  document.getElementById("error_message").innerText = "";
  clearFormFields();
}
function deleteContactById(id) {
  console.log('Deleting Contact ID:', id);
  let contact = contactService.getContactById(id);
  if (confirm) {
    let deletedContactElement = document.querySelector(`.contact[data-id="${id}"]`);
    if (deletedContactElement) {
      deletedContactElement.remove();
      let fullDetailsBox = document.getElementById("fullDetailsBox");
      if (fullDetailsBox) {
        fullDetailsBox.classList.remove("visible");
        fullDetailsBox.classList.add("hidden");
      } else {
        console.log('Full details box not found');
      }
      contactService.deleteContact(contact);
    }
    else {
      console.log('Deleted contact element not found in the DOM');
    }
  }
}
function clearFields() {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('mobile').value = '';
  document.getElementById('landline').value = '';
  document.getElementById('website').value = '';
  document.getElementById('address').value = '';
}