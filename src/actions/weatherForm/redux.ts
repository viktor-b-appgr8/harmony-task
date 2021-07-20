import { createDraft, Draft } from 'immer';
import { createReducerCase } from '@base/features/base-decorator';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from 'actions';
import {
	WeatherFormState, TypesNames, ActionCreator, WeatherFormSagaAction, SetTempAction
} from './interface';

// TODO: Do not for get add your reducer to index file

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	mySaga: ['city'], // handle by saga
	setTemp: ['temp']
});

export const WeatherFormTypes = TypesNames;
export const WeatherFormActions = Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = createDraft<WeatherFormState>({
	country: '',
	city: '',
	temp: '',
	description: '',
});

/* ------------- Selectors ------------- */

export const weatherFormSelector = {
	getExampleData: (state: ApplicationState) => state.weatherForm?.city,
	selectTemp: (state: ApplicationState) => state.weatherForm?.temp
};

/* ------------- Reducers ------------- */

const setCityReducer = (draft: Draft<WeatherFormState>, action: WeatherFormSagaAction) => {
	const { city } = action;
	draft.city = city;
};
const setTempReducer = (draft: Draft<WeatherFormState>, action: SetTempAction) => {
	const { temp } = action;
	draft.temp = temp;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<any, any>(INITIAL_STATE, {
	[TypesNames.MY_SAGA]: createReducerCase(setCityReducer),
	[TypesNames.SET_TEMP]: createReducerCase(setTempReducer)
});
