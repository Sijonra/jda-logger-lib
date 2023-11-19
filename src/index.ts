import { createSimpleLogger } from './modules/logger';
import { LoggerPublic } from './modules/types';

function createHiddenLogger<Schema extends object>(
	schema: Schema,
): LoggerPublic<Schema> {
	return createSimpleLogger(schema) as LoggerPublic<Schema>;
}

export { createHiddenLogger };
