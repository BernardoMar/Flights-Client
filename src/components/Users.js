import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SERVER_URL_USERS = 'http://localhost:3000/users.json';


class Users extends Component{
  constructor() {
    super();
    this.state={users: []};
    this.saveUser = this.saveUser.bind(this);
  };

  componentDidMount() {
    const fetchUsers = () => {
      axios(SERVER_URL_USERS).then((response) => {
        this.setState({users: response.data});
        setTimeout(fetchUsers, 5000);
      });
    };
    fetchUsers();
  }

  saveUser(name, user, password) {
    axios.post(SERVER_URL_USERS, {user:{name: name, email: user, password: password}}).then((response) => {this.setState({users: [...this.state.users, response.data]});
  });
  };

  render() {
    return(
      <div style={{border: "1px solid black", paddingBottom: "40px", paddingTop: "15px", borderRadius: "20px", background: "white", }}>
          <SignUp onSubmit={this.saveUser} />
          <Login />
          <LogOut />
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      userName: '',
      password: ''
    };
    this._handleChangeUserName = this._handleChangeUserName.bind(this)
    this._handleChangeName = this._handleChangeName.bind(this)
    this._handleChangePassword = this._handleChangePassword.bind(this)
    this._handleChangePasswordConfirmation = this._handleChangePasswordConfirmation.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

_handleChangeUserName(event) {
  this.setState({userName: event.target.value});
}
_handleChangeName(event) {
  this.setState({name: event.target.value});
}
_handleChangePassword(event) {
  this.setState({password: event.target.value});
}
_handleChangePasswordConfirmation(event) {
  if (event.target.value === this.state.password) {
    this.setState({password: event.target.value});
    console.log('password stored');
  } else {
    console.log('password incorrect'); //TODO: FIX THIS
  };
};

_handleSubmit(event) {
  event.preventDefault();
  this.props.onSubmit(this.state.name, this.state.userName, this.state.password);
  this.setState({userName: '', password: ''});
};

  render() {
    return(
      <div >
        <h2 style={{color: "red"}}>Creat Accout to Search and Book Flights</h2>
        <form onSubmit={this._handleSubmit}>
          <input type="text" placeholder="Name" onChange={this._handleChangeName} required/>
          <input type="text" placeholder="User Name" onChange={this._handleChangeUserName} required/>
          <input type="password" onChange={this._handleChangePassword} required placeholder="password"/>
          <input type="password" onChange={this._handleChangePasswordConfirmation} required placeholder="confirm password"/>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

class Login extends Component {
  render() {
    return(

      <div>
        <h2 style={{color: "red"}}>LogIn to Search and Book Flights</h2>
        <input type="text" placeholder="username@gmail.com"/>
        <input type="password" placeholder="password"/>
        <input type="submit"/>
      </div>

    );
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

class LogOut extends Component {
  render() {
    return(
      <div style={{color: "red"}}>
        LogOut Form Coming Soon
      </div>
    );
  }
}
export default Users;
