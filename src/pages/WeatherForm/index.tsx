import * as React from 'react';
import { LocalizeContextProps } from 'react-localize-redux';
import { baseConnectForm } from '@base/features/base-redux-react-connect';
import {
	InjectedFormProps, ConfigProps, initialize, getFormValues
} from 'redux-form';
import { Dispatch } from 'redux';
import {
	alphaNumeric, maxLength, required,
} from 'utils/validations';
import { ApplicationState } from 'actions';
import {WeatherFormActions} from 'actions/weatherForm'
import  {WeatherFormSagaFunction } from 'actions/weatherForm/interface';
// import { WeatherFormActions, weatherFormSelector } from 'actions/redux/weatherForm';
import { FieldInput } from 'common-components/controllers';
import FieldDropDown from 'common-components/controllers/FieldDropDown';

import './style.scss';

export type Props = {

} & ConfigProps;

type FormValues = {
	city?: string;
	inputValue?: string;
};

export interface OwnProps extends Props, LocalizeContextProps {
	formValues: (formName: string) => FormValues;
	initForm: (formName: string, data: FormValues) => void;
	mySaga: typeof WeatherFormSagaFunction;
}
export class WeatherForm extends React.Component<OwnProps & InjectedFormProps> {
	  

	componentDidMount(): void {
		const { initForm, form } = this.props;

		initForm(form, {
			inputValue: '',
			city: 'Sofia',
		});
	}


	

	render() {
		

		const { handleSubmit, formValues, form } = this.props;
		// eslint-disable-next-line no-console
		console.log(formValues(form));
		
		return (
			<form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
				<FieldInput
					
					name="inputValue"
					type="text"
					placeholder="Input Text"
					validate={[required, maxLength]}
					warn={alphaNumeric}
				/>
				<hr />
				<FieldDropDown
				  name="city"
				  onChange={ () => {
					  const {  mySaga	} = this.props
					console.log(mySaga,"values")
					console.log(formValues(form).city, "formata kakto se kazva")
					console.log(typeof formValues(form).city, "formata kakto se type")
					}}
				  />
				<div>
					<button type="submit">
						Submit
					</button>
				</div>
			</form>
		);
	}

	handleSubmit() {
	}
}

export default baseConnectForm(WeatherForm,
	(state: ApplicationState) => ({
			formValues: (formName: string) => getFormValues(formName)(state)
	}),
	(dispatch: Dispatch) => {
		return {
			initForm: (formName: string, data: FormValues) => dispatch(initialize(formName, data)),
			mySaga: (city: string) => dispatch(WeatherFormActions.mySaga(city))
		};
	},
	{
		form: 'FormExampleForm'
	});


