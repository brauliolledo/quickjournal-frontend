export type Transient<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
export type ForUpdating<T> = Omit<T, 'createdAt' | 'updatedAt'>;

/**
 * Type guard for type narrowing from transient entities
 */
export function isNotTransient<T extends object>(entity: Transient<T> | T): entity is T {
	return `id` in entity;
}
