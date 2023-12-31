var contactService = new ContactService();
function getContactDetails() {
  var details = {};
  details.name = document.getElementById('name').value;
  details.email = document.getElementById('email').value;
  details.mobile = document.getElementById('mobile').value;
  details.landline = document.getElementById('landline').value;
  details.website = document.getElementById('website').value;
  details.address = document.getElementById('address').value;
  return details;
}
function addContact() {
  var details = getContactDetails();
  if (!isValidMobile(details.mobile)) {
    alert("Please enter a valid mobile number.");
    return;
  }
  if (!isValidEmail(details.email)) {
    alert("Please enter a valid email address.");
    return;
  }
  var contact = new Contact(details);
  contactService.saveContact(contact);
  emptyFields();
  closeDialog();
  var contactElement = createContactList(contact);
  var contactList = document.getElementById('contactList');
  contactList.appendChild(contactElement);
}
function updateContact() {
  var details = getContactDetails();
  let addButton = document.getElementById('addUpdateButton');
  details.id = document.getElementById('addUpdateButton').dataset.contactId;
  let updatedContact = new Contact(details);
  console.log('hfdfhfdjgdhjk', updatedContact)
  contactService.updateContact(updatedContact);
  closeDialog();
  emptyFields();
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
    let inactive = document.getElementsByClassName("active")[0];
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
  console.log('nbcjhhvdn', contact)
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
  var detailsBox = document.getElementById('detailsBox');
  detailsBox.innerHTML = '';
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
  let detailsBox = document.getElementById("detailsBox");
  detailsBox.classList.add("visible");
  detailsBox.classList.remove("hidden");
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
}
function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function isValidMobile(mobile) {
  var mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobile);
}
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
  emptyFields()
}
function cancelDialog() {
  dialog.classList.add("hidden");
  document.getElementById("error_message").innerText = "";
  emptyFields();
}
function emptyFields() {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('mobile').value = '';
  document.getElementById('landline').value = '';
  document.getElementById('website').value = '';
  document.getElementById('address').value = '';
}
function deleteContactById(id) {
  console.log('Deleting Contact ID:', id);
  let contact = contactService.getContactById(id);
  if (confirm) {
    let deletedContactElement = document.querySelector(`.contact[data-id="${id}"]`);
    if (deletedContactElement) {
      deletedContactElement.remove();
      let detailsBox = document.getElementById("detailsBox");
      if (detailsBox) {
        detailsBox.classList.remove("visible");
        detailsBox.classList.add("hidden");
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
