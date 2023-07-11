import axios from 'axios';
import type { Entry } from '../models/Entry';

type TransientEntry = Omit<Entry, 'id' | 'createdAt' | 'updatedAt'>;

const entryManager = () => ({
	createEntry: async (entry: TransientEntry) => {
		return axios.post<TransientEntry, Entry>(`${import.meta.env.VITE_API_BASE_URL}/Entry`, entry);
	}
});

export default entryManager();
