import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Profile extends Component {
  state = {
    load: false,
    name: '',
    email: '',
    image: '',
    description: '',
  };

  componentDidMount() {
    this.saveUsersLog();
  }

  saveUsersLog = async () => {
    this.setState({
      load: true,
    });
    const user = await getUser();
    this.setState({
      load: false,
      name: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
    });
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const targetVal = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: targetVal,
    });
  };

  userUpdate = async () => {
    const {
      email,
      name,
      description,
      image,
    } = this.state;
    this.setState({
      load: true,
    });
    await updateUser({
      email,
      name,
      description,
      image,
    });
    this.setState({
      isRedirecting: true,
      load: false,
    });
  };

  isValid = () => {
    const { email } = this.state;
    const teste = /\S+@\S+\.\S+/;
    return !teste.test(email) && email.length !== 0;
  };

  render() {
    const {
      load,
      image,
      description,
      email,
      name,
      isRedirecting,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { load ? (
          <Loading />
        ) : (
          <div className="profile-edit-container">
            <input
              data-testid="edit-input-image"
              type="text"
              name="image"
              value={ image }
              onChange={ this.onInputChange }
              placeholder="URL da Imagem"
            />
            <span>Nome</span>
            <input
              data-testid="edit-input-name"
              type="text"
              name="name"
              value={ name }
              onChange={ this.onInputChange }
            />
            <span>E-mail</span>
            <input
              data-testid="edit-input-email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.onInputChange }
            />
            <span>Descrição</span>
            <input
              data-testid="edit-input-description"
              type="text"
              name="description"
              value={ description }
              onChange={ this.onInputChange }
            />
            <button
              data-testid="edit-button-save"
              type="submit"
              disabled={ this.isValid() }
              onClick={ this.userUpdate }
            >
              Salvar
            </button>
          </div>
        )}
        { isRedirecting && <Redirect to="/profile" /> }
      </div>

    );
  }
}
export default Profile;
