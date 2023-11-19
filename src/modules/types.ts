import { clear, error, log, print, warn } from './methods';

export type TMessageMode = 'log' | 'warn' | 'error';
export type TMessage = {
	mode: TMessageMode;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	messages: any[];
};

export type TMessageEventHandler =
	| ((messages: TMessage, sender: TLoggerApi) => void)
	| null;

export type TLoggerApi = {
	$log: typeof log;
	$warn: typeof warn;
	$error: typeof error;
	$print: typeof print;
	$clear: typeof clear;
	$__messages: TMessage[];
	$__name: string;
	$__onMessage: TMessageEventHandler;
};

export type TLoggerApiMethods = Exclude<
	keyof TLoggerApi,
	'$__messages' | '$__name' | '$__isWatching' | '$__onMessage'
>;
export type TLoggerPublicApi = Pick<TLoggerApi, TLoggerApiMethods>;

export type Logger<Schema> = {
	[Key in keyof Schema]: Schema[Key] extends object
		? Logger<Schema[Key]>
		: never;
} & TLoggerApi;

export type LoggerPublic<Schema> = {
	[Key in keyof Schema]: Schema[Key] extends object
		? LoggerPublic<Schema[Key]>
		: never;
} & TLoggerPublicApi;
