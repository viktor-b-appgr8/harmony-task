import { Action } from 'redux';

/* ------------- Define Actions and State ------------- */
export interface WeatherFormState {
	country: string;
	city: string;
	temp: string;
	description: string;

}

export enum TypesNames {
	SET_TEMP = 'SET_TEMP',
	MY_SAGA = 'MY_SAGA'
}

export declare function SetExampleFunction(temp: string): SetTempAction;
export declare function WeatherFormSagaFunction(someData: string): WeatherFormSagaAction;

export interface ActionCreator {
	setTemp: typeof SetExampleFunction;
	mySaga: typeof WeatherFormSagaFunction;
}

export interface SetTempAction extends Action<TypesNames.SET_TEMP> {
	temp: string;
}

export interface WeatherFormSagaAction extends Action<TypesNames.MY_SAGA> {
	city: string;
}

/* ------------- Define Any Interfaces ------------- */
export interface WeatherResponse {
	city: string;
}
