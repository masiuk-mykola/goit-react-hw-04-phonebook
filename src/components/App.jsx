import { useState, useEffect } from 'react';
import { ContactForm } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { Box } from './Box';
import { Filter } from './Filter/Filter';

const LS_KEY = 'contactList';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LS_KEY)) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmitForm = contact => {
    contacts.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    )
      ? alert(` ${contact.name} is already in contacts`)
      : setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const onDeleteContact = contactID => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactID)
    );
  };

  const normalFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalFilter)
  );

  return (
    <Box p={10}>
      <h2>Phonebook</h2>

      <ContactForm onSubmit={handleSubmitForm} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />

      {contacts.length === 0 ? (
        <h3>Please, add new contact</h3>
      ) : (
        <ContactList contacts={visibleContacts} onDeleteBtn={onDeleteContact} />
      )}
    </Box>
  );
};
