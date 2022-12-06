import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Profile extends Component {
  state = {
    load: false,
    users: [],
  };

  componentDidMount() {
    this.saveUsersLog();
  }

  saveUsersLog = async () => {
    this.setState({
      load: true,
    });
    const loggedPerson = await getUser();
    this.setState({
      load: false,
      users: loggedPerson,
    });
  };

  render() {
    const {
      load,
      users,
    } = this.state;
    const {
      image,
      description,
      email,
      name,
    } = users;
    return (
      <div data-testid="page-profile">
        <Header />
        Profile
        { load ? <Loading /> : (
          <div>
            <img
              data-testid="profile-image"
              src={ image }
              alt={ name }
            />
            <Link
              to="/profile/edit"
            >
              Editar perfil
            </Link>
            <span>Nome</span>
            <h1>{name}</h1>
            <span>E-mail</span>
            <h2>{email}</h2>
            <span>Descrição</span>
            <h3>{description}</h3>
          </div>
        )}
      </div>
    );
  }
}
