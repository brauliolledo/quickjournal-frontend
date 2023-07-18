import axios, { type AxiosResponse } from 'axios';
import type { Entry } from '../models/Entry';
import type { Transient } from './EntityManagerTypings';
import dayjs from 'dayjs';

const parseTimestampFieldsInEntity = <T>(entity: T, timestampFields: string[]) => {
	return {
		...entity,
		...timestampFields.reduce(
			(acc, field) => ({
				...acc,
				[field]: (entity as any)[field] != null ? dayjs.utc((entity as any)[field]).local() : null
			}),
			{}
		)
	} as T;
};

/**
 *
 * @param entityName
 * @param timestampFields Property names where we can find timestamps that we can parse
 */
const entityManager = <T>(entityName: string, timestampFields: string[]) => ({
	create: async (entity: Transient<T>) => {
		return axios
			.post<Transient<T>, AxiosResponse<T>>(
				`${import.meta.env.VITE_API_BASE_URL}/${entityName}`,
				entity
			)
			.then((r) => parseTimestampFieldsInEntity(r.data, timestampFields));
	},
	getAll: async (sorts: string[] = []) => {
		return axios
			.get<void, AxiosResponse<T[]>>(
				`${import.meta.env.VITE_API_BASE_URL}/${entityName}?sorts=${sorts.join(',')}`
			)
			.then((r) => r.data.map((d) => parseTimestampFieldsInEntity(d, timestampFields)));
	}
});

export const EntryManager = entityManager<Entry>(`Entry`, [`createdAt`, `updatedAt`]);
