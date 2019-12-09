import React from 'react';

class ParticipantPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      name: '',
      city: '',
      statut: '',
      age: '',
      email: '',
    };
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('firstName', JSON.stringify(nextState.firstName));
    localStorage.setItem('name', JSON.stringify(nextState.name));
    localStorage.setItem('city', JSON.stringify(nextState.city));
    localStorage.setItem('age', JSON.stringify(nextState.age));
    localStorage.setItem('email', JSON.stringify(nextState.email));
    localStorage.setItem('statut', JSON.stringify(nextState.statut));

  }

  getFirstName = (e) => {
    this.setState({ firstName: e.currentTarget.value });

  };

  getName = (e) => {
    this.setState({ name: e.currentTarget.value });

  };

  getCity = (e) => {
    this.setState({ city: e.currentTarget.value });
    localStorage.setItem('city', this.state.city);

  };

  getAge = (e) => {
    this.setState({ age: e.currentTarget.value });
    localStorage.setItem('age', this.state.age);

  };

  getEmail = (e) => {
    this.setState({ email: e.currentTarget.value });
    localStorage.setItem('email', JSON.stringify(this.state.email));

  };

  getStatut = (e) => {
    this.setState({ statut: e.currentTarget.value });
    localStorage.setItem('statut', this.state.statut);

  };

  handleSubmit = (e) => {
    e.preventDefault();
  };



  render() {
    return (
      <form>
        <label htmlFor="firstName">Prenom:</label>
        <input
          name="firstName"
          onChange={this.getFirstName}
          value={this.state.firstname}
          id="firstName"
          type="text"
        />

        <label htmlFor="name">Nom:</label>
        <input
          name="name"
          onChange={this.getName}
          value={this.state.name}
          id="name"
          type="text"
        />

        <label htmlFor="city">Ville:</label>
        <input
          name="city"
          onChange={this.getCity}
          value={this.state.city}
          id="city"
          type="text"
        />

        <label htmlFor="statut">status:</label>
        <select name="statut" id="statut" onChange={this.getStatut}>
          <option value="">--votre statut--</option>
          <option value="teacher">Enseignant</option>
          <option value="student">Eleve</option>
          <option value="admin">admin</option>
        </select>

        <label htmlFor="age">age:</label>
        <input
          name="age"
          onChange={this.getAge}
          value={this.state.age}
          id="age"
          type="text"
        />

        <label htmlFor="email">email:</label>
        <input
          name="email"
          onChange={this.getEmail}
          value={this.state.email}
          id="email"
          type="email"
        />

        <input type="submit" value="Envoyer" />
      </form>
    );
  }
}

export default ParticipantPage;
