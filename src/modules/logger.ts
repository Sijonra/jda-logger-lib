import { bindMethodsToLogger } from './helpers';
import { clear, error, log, print, warn } from './methods';
import { Logger, TLoggerApi, TMessageEventHandler } from './types';

export function createSimpleLogger<Schema extends object>(
	schema: Schema,
	scopeName = '@simple/logger',
	onMessage: TMessageEventHandler = null,
): Logger<Schema> {
	const handleMessage: TMessageEventHandler = (messages, sender) => {
		onMessage?.(messages, sender);
	};

	const api: TLoggerApi = {
		$log: log,
		$warn: warn,
		$error: error,
		$print: print,
		$clear: clear,
		$__messages: [],
		$__name: scopeName,
		$__onMessage: handleMessage,
	};

	const rawLogger: Partial<Logger<Schema>> = {};
	let scope: keyof typeof schema;

	for (scope in schema) {
		const child = schema[scope];
		rawLogger[scope] = createSimpleLogger(
			child as object,
			scope,
			handleMessage,
		) as Logger<Schema>[keyof Schema];
	}

	const logger = bindMethodsToLogger({
		...rawLogger,
		...api,
	} as Logger<Schema>);

	return logger;
}
