import { useState, useEffect } from "react";
import AddContact from "./AddContact";
import ContactList from "./ContactList";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState();

  useEffect(() => {
    const localContacts = JSON.parse(localStorage.getItem("contacts"));
    setContacts(localContacts || []);
  }, []);

  const updateContacts = (updatedContacts) => {
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  const onAddContact = (contact) => {
    const contactIndex = contacts.findIndex((c) => c.id === contact.id);
    if (contactIndex !== -1) {
      const updatedContacts = [...contacts];
      updatedContacts.splice(contactIndex, 1, contact);
      updateContacts(updatedContacts);
    } else {
      updateContacts([
        ...contacts,
        {
          ...contact,
          id: contacts.length + Math.floor(Math.random() * 10 + 1),
        },
      ]);
    }
  };

  const onDeleteContact = (id) => {
    updateContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <div className="App">
      <AddContact onAddContact={onAddContact} contact={editContact} />
      <ContactList contacts={contacts} onDeleteContact={onDeleteContact} />
    </div>
  );
}
