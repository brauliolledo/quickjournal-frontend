//     This code was generated by a Reinforced.Typings tool.
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.

import type dayjs from 'dayjs';

export interface Entry {
	id: string;
	body?: string;
	createdAt: dayjs.Dayjs;
	updatedAt: dayjs.Dayjs;
	important: boolean;
	trackId: string;
	track: Track;
}
export interface Track {
	id: string;
	name: string;
	createdAt: dayjs.Dayjs;
	updatedAt: dayjs.Dayjs;
	colour: string;
	entries: Entry[];
}
