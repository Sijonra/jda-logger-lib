import { castLogger } from './helpers';
import { Logger, LoggerPublic, TMessage, TMessageMode } from './types';

type TConsoleMethod = <Schema extends object>(
	this: LoggerPublic<Schema>,
	...messages: TMessage['messages']
) => void;

function add<Schema extends object>(
	scope: Logger<Schema>,
	mode: TMessageMode,
	messages: TMessage['messages'],
) {
	scope.$__messages.push({ mode, messages });
}

export const log: TConsoleMethod = function (...messages) {
	add(castLogger(this), 'log', messages);
};
export const warn: TConsoleMethod = function (...messages) {
	add(castLogger(this), 'warn', messages);
};
export const error: TConsoleMethod = function (...messages) {
	add(castLogger(this), 'error', messages);
};

export function print<Schema extends object>(
	this: LoggerPublic<Schema>,
	isExpanded = true,
) {
	const self = castLogger(this);

	if (isExpanded) console.group(self.$__name);
	else console.groupCollapsed(self.$__name);

	for (const message of self.$__messages) {
		console[message.mode](...message.messages);
	}

	let prop: keyof typeof self;
	for (prop in self) {
		if (prop.startsWith('$')) continue;
		print.bind(self[prop])(isExpanded);
	}

	console.groupEnd();
}

export function clear<Schema extends object>(this: LoggerPublic<Schema>) {
	const self = castLogger(this);

	self.$__messages = [];

	let prop: keyof typeof self;
	for (prop in self) {
		if (prop.startsWith('$')) continue;
		clear.bind(self[prop])();
	}
}
