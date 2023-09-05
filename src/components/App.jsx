import { ContactForm } from './ContactForm/ContactForm';
import { Contacts } from './Contacts/Contacts';
import { GlobalStyle } from './GlobalStyle';
import { nanoid } from 'nanoid';
import { Layout } from './Layout';
import { Filter } from './Filter/Filter';
import { useEffect, useState } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isAlreadyExists = inputName => {
    return contacts.some(({ name }) => name === inputName);
  };

  const addContact = (values, actions) => {
    if (isAlreadyExists(values.name)) {
      window.alert(values.name + ' is already in contacts.');
    } else {
      setContacts(prev => [...prev, { ...values, id: nanoid() }]);
      actions.resetForm();
    }
  };

  const getFilter = input => {
    setFilter(input);
  };

  const renderContactsByFilter = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = idRemove => {
    setContacts(prev => prev.filter(({ id }) => id !== idRemove));
  };

  return (
    <Layout>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact}></ContactForm>
      <h2>Contacts</h2>
      <Filter addFilter={getFilter}></Filter>
      <Contacts
        contacts={renderContactsByFilter()}
        deleteContact={deleteContact}
      ></Contacts>
      <GlobalStyle></GlobalStyle>
    </Layout>
  );
};

function initialContacts() {
  return JSON.parse(localStorage.getItem('contacts')) || [];
}
