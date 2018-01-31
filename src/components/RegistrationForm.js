import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './Input';
import {required, nonEmpty, length, isTrimmed} from '../validators';
import './RegistrationForm.css';

export class RegistrationForm extends React.Component {

    
    onSubmit(values) {
        const {userName, passWord, firstName, lastName} = values;
        let username = userName;
        let password = passWord;
        const user = {username, password, firstName, lastName};
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(userName, passWord)));
    }

    render() {

        return (
            <div className='register-form-wrapper'>
            <form
                className="register-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <label htmlFor="firstName"><span className="label-float glyphicon glyphicon-user"></span></label>
                <Field id='first-name-form' component={Input} type="text" name="firstName" placeholder="First Name" />
                <label htmlFor="lastName"><span className="label-float glyphicon glyphicon-user"></span></label>
                <Field id='last-name-form' component={Input} type="text" name="lastName" placeholder='Last Name'/>
                <label htmlFor="username"><span className="label-float glyphicon glyphicon-user"></span></label>
                <Field
                    component={Input}
                    type="text"
                    name="userName"
                    validate={[required, nonEmpty, isTrimmed]}
                    id='user-name-form' 
                    placeholder='Username'
                />
                <label htmlFor="password"><span className="label-float glyphicon glyphicon-lock"></span></label>
                <Field
                    component={Input}
                    type="password"
                    name="passWord"
                    validate={[required, length({min: 8, max: 72}), isTrimmed]}
                    id='password-form' 
                    placeholder='Password'
                />
                {/* <label htmlFor="passwordConfirm"><span className="label-float glyphicon glyphicon-lock"></span></label>
                <Field
                    component={Input}
                    type="password"
                    name="password-confirm-form"
                    validate={[required, nonEmpty, matches('password')]}
                    id='password-confirm-form' 
                    placeholder='Confirm Password'
                /> */}
                <button
                    type="submit"
                    className='submit-register-button'
                    disabled={this.props.pristine || this.props.submitting}>
                    Register
                </button>
            </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);