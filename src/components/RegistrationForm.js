import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './Input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
import './RegistrationForm.css';

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, password, firstName, lastName} = values;
        const user = {username, password, firstName, lastName};
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
        return (
            <div className='register-form-wrapper'>
            <form
                className="register-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <label className='label-float' htmlFor="firstName"><span class="glyphicon glyphicon-user"></span></label>
                <Field id='first-name-form' component={Input} type="text" name="firstName" placeholder="First Name" />
                <label className='label-float' htmlFor="lastName"><span class="glyphicon glyphicon-user"></span></label>
                <Field id='last-name-form' component={Input} type="text" name="lastName" placeholder='Last Name'/>
                <label className='label-float' htmlFor="username"><span class="glyphicon glyphicon-user"></span></label>
                <Field
                    component={Input}
                    type="text"
                    name="username"
                    validate={[required, nonEmpty, isTrimmed]}
                    id='user-name-form' 
                    placeholder='Username'
                />
                <label className='label-float' htmlFor="password"><span class="glyphicon glyphicon-lock"></span></label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    validate={[required, length({min: 8, max: 72}), isTrimmed]}
                    id='password-form' 
                    placeholder='Password'
                />
                <label className='label-float' htmlFor="passwordConfirm"><span class="glyphicon glyphicon-lock"></span></label>
                <Field
                    component={Input}
                    type="password"
                    name="password-confirm-form"
                    validate={[required, nonEmpty, matches('password')]}
                    id='password-confirm-form' 
                    placeholdeer='Confirm Password'
                />
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