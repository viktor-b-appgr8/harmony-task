/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Field, BaseFieldProps, WrappedFieldProps, change } from 'redux-form';
import { TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Store } from '@base/features';
// import  {WeatherFormSagaFunction } from 'actions/weatherForm/interface';

export type Props = {

} & BaseFieldProps;

class FieldDropDown extends React.Component<Props> {
	renderField(fieldData: WrappedFieldProps) {
		
		const getSelectedOption = () => {
			return cities.find((o: { city: any }) => o.city === input.value);
		};
		const cities: any = [
			{city: "Sofia"},
			{city : "Plovdiv"},
			{city: "Varna"},
		]

		const { input, meta, ...rest } = fieldData;
		const { touched, error, warning } = meta;
		const { onChange } = input;
		const errorMessage = touched ? (warning || error) : undefined;

		
		return (
			<Autocomplete
			options={cities}
			value={getSelectedOption()}
			getOptionLabel={(option) => option.city}
			style={{ width: 300 }}
			onChange={async (event, newValue) =>{ 
				await Store.dispatch(change('FormExampleForm', 'cities', newValue))
				onChange(newValue)}}
			renderInput={(params) => {
				return (
					<TextField variant="outlined" {...params} {...rest} helperText={errorMessage} error={errorMessage} />
				);
			}}
			/>
		);
	}

	render() {
		return (
			<Field
				{...(this.props as BaseFieldProps)}
				component={this.renderField}
			/>
		);
	}
}

export default FieldDropDown;
