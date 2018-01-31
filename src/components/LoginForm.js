import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './Input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';

export class LoginForm extends React.Component {

    //When submitted, username and password are submitted
    onSubmit(values) {

        return this.props.dispatch(login(values.username, values.password));
    }

    //logs into demo
    onEnter() {
        return this.props.dispatch(login('demo', 'demo1234'));
    }

    render() {

        //Gives Error message if necessary
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        return (
            <div className='login-form-wrapper'>
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}
                
                >
                
                <Field
                    component={Input}
                    type="text"
                    name="username"
                    id="username"
                    placeholder='Username'
                    validate={[required, nonEmpty]}
                    
                />
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    id="password"
                    placeholder='Password'
                    validate={[required, nonEmpty]}
                    
                />
                {error}
                <button className='login-button' disabled={this.props.pristine || this.props.submitting}>
                    Login
                </button>
            </form>
            <button onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                this.onEnter();
            }} 
            className='login-button'>
            Demo
            </button> 
            </div>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => {
      dispatch(focus('login', 'username'))
    }
})(LoginForm);