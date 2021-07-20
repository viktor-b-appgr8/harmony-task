/**
 * Here you add all the apis urls defenition
 */

import request from '@base/features/base-api';
import { AxiosResponse } from 'axios';
import { config } from 'config';
import GenericMobileImage from 'public/assets/images/generic-mobile.jpg';
import responseExample from './mocks/response_example.json';
import { Device } from 'actions/catalog/interface';

export interface Api {
	getDevices: () => Promise<AxiosResponse>;
	getWeatherByCity: (cityName: string) => Promise<AxiosResponse>;
	getDevicesMock: () => any;
}

export const createApi = (baseURL = config.ROOT_SERVER_URL): Api => ({
	getDevices: () => request.call({
		baseURL: 'http://6ew7g.mocklab.io/' || baseURL,
		method: 'get',
		url: '/getlatestWithCustomResponseCode'
	}),
	getDevicesMock: () => {
		const genericImage = GenericMobileImage;

		const mock = (responseExample as Device[]).map((item) => {
			const temp = { ...item };
			temp.image = genericImage;
			return temp;
		});

		return {
			status: 200,
			data: mock
		};
	},
	getWeatherByCity: (cityName: string) => request.call({
		baseURL: `http://api.weatherapi.com/`,
		method: 'get',
		url: `v1/current.json?key=a54002f6a3d243a9937104838211607&q=${cityName}`

	})
});

export default createApi();
