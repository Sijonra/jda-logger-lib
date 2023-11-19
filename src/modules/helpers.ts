import { Logger, LoggerPublic, TLoggerApiMethods } from './types';

export function bindMethodsToLogger<Schema>(
	logger: Logger<Schema>,
): Logger<Schema> {
	let method: keyof typeof logger;

	for (method in logger) {
		method = method as TLoggerApiMethods;
		const isMethod =
			method.startsWith('$') && logger[method]?.bind !== undefined;

		if (!isMethod) continue;

		logger[method] = logger[method].bind(logger);
	}

	return logger;
}

export function castLoggerPublic<Schema extends object>(
	scope: Logger<Schema>,
): LoggerPublic<Schema> {
	return scope as LoggerPublic<Schema>;
}

export function castLogger<Schema extends object>(
	scope: LoggerPublic<Schema>,
): Logger<Schema> {
	return scope as Logger<Schema>;
}
