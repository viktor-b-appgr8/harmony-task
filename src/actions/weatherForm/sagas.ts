import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import api from 'requests';
import { WeatherFormActions } from 'actions/weatherForm';
import { WeatherFormSagaAction } from 'actions/weatherForm/interface';

export function* weatherFormSaga(action: WeatherFormSagaAction) {
	const { city } = action;
	const response: AxiosResponse = yield call(api.getWeatherByCity, city);
	yield put(WeatherFormActions.setTemp(response.data.current.temp_c));
}
