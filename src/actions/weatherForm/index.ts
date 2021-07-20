import { all, fork, takeLatest } from 'redux-saga/effects';
import { createSaga } from '@base/features/base-decorator';
import * as Sagas from 'actions/weatherForm/sagas';
import { WeatherFormTypes } from 'actions/weatherForm';

/* ------------- Export Redux ------------- */
export * from 'actions/weatherForm/redux';

/* ------------- Export Sagas ------------- */
function* watchMySaga() {
	yield takeLatest(WeatherFormTypes.MY_SAGA, createSaga(Sagas.weatherFormSaga));
}

// TODO: Do Not Forget to Add your new saga to index file
export function* weatherFormSaga() {
	yield all([
		fork(watchMySaga)
	]);
}
