import { Component } from 'react';
import { ContactForm } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { Box } from './Box';
import { Filter } from './Filter/Filter';

const LS_KEY = 'contactList';

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const contactsFromLS = JSON.parse(localStorage.getItem(LS_KEY));
    if (contactsFromLS) {
      this.setState({
        contacts: contactsFromLS,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      const contacts = JSON.stringify(this.state.contacts);
      localStorage.setItem(LS_KEY, contacts);
    }
  }

  handleSubmitForm = contact => {
    this.state.contacts.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    )
      ? alert(` ${contact.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [contact, ...prevState.contacts],
        }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  onDeleteContact = contactID => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactID),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const normalFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalFilter)
    );

    return (
      <Box p={10}>
        <h2>Phonebook</h2>

        <ContactForm onSubmit={this.handleSubmitForm} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />

        {contacts.length === 0 ? (
          <h3>Please, add new contact</h3>
        ) : (
          <ContactList
            contacts={visibleContacts}
            onDeleteBtn={this.onDeleteContact}
          />
        )}
      </Box>
    );
  }
}
