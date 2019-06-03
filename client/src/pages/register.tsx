import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/icon';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';
import { isEmpty } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { SnackbarComponent } from '../components/snackbar';
import myTheme from '../components/theme';
import { alertError, clearAlert } from '../store/actions/alert-actions';
import { userRegister } from '../store/actions/user-actions';

const styles = {
  registerButton: {
    marginTop: '0.5rem',
  },
  sendIcon: {
    paddingLeft: '0.5rem',
  },
  login1RedirectButton: {
    margin: '1rem 0 0 1rem',
  },
};

interface RegisterPageState {
  email: string;
  password: string;
}

class Register extends React.Component<any, RegisterPageState> {
  state = {
    username: '',
    email: '',
    password: '',
  };

  handleChange = (name: string) => (event: any) => {
    this.setState({ ...this.state, [name]: event.target.value });
  };

  handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.clearAlert();
  };

  render() {
    const { username, email, password } = this.state;
    const { classes, alert, history } = this.props;

    const formSubmit = (event: any) => {
      event.preventDefault();
      if (isEmpty(username) || isEmpty(email) || isEmpty(password)) {
        this.props.alertError('Username or email or password cannot be empty');
      } else {
        const user = {
          username,
          email,
          password,
        };
        this.props.userRegister(user);
      }
    };

    const RegisterButton = (
      <Button className={classes.registerButton} variant='contained' color='primary' type='submit' onClick={formSubmit}>
        Register
        <Icon className={classes.sendIcon}>send</Icon>
      </Button>
    );

    const LoginRedirectButton = (
      <Button
        className={classes.login1RedirectButton}
        variant='contained'
        color='primary'
        onClick={() => {
          history.push('/login');
        }}>
        Login
      </Button>
    );

    return (
      <MuiThemeProvider theme={myTheme}>
        <div className='container'>
          <Grid container direction='row' justify='center' alignItems='center'>
            <Grid item xs={12}>
              {LoginRedirectButton}
            </Grid>
          </Grid>
          {alert.type !== null && !isEmpty(alert.message) ? (
            <SnackbarComponent
              open={alert.type !== null && !isEmpty(alert.message)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              message={alert.message}
              variant={alert.type}
              onClose={this.handleClose}
            />
          ) : null}
          <div className='user-form'>
            <div className='user-form-title-container'>
              <h3 className='user-form-title '>Register</h3>
            </div>
            <form onSubmit={formSubmit}>
              <Grid container direction='row' justify='center' alignItems='center'>
                <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                  <TextField
                    label='Username'
                    name='username'
                    margin='normal'
                    variant='outlined'
                    value={username}
                    onChange={this.handleChange('username')}
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container direction='row' justify='center' alignItems='center'>
                <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                  <TextField
                    label='Email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    margin='normal'
                    variant='outlined'
                    value={email}
                    onChange={this.handleChange('email')}
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container direction='row' justify='center' alignItems='center'>
                <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                  <TextField
                    label='Password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    margin='normal'
                    variant='outlined'
                    value={password}
                    onChange={this.handleChange('password')}
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container direction='row' justify='center' alignItems='center'>
                <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                  {RegisterButton}
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    alert: state.alert,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
  return bindActionCreators(
    {
      clearAlert,
      alertError,
      userRegister,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Register));
