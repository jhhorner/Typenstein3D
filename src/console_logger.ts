import { Singleton } from './singleton.js';

/** Maps to the native `console` method names used when writing each log entry. */
export const enum LogLevel {
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
}

/** Broad category attached to a log entry to indicate which subsystem to associate. */
export const enum LogContext {
  None = 'None',
  Resource = 'Resource',
  Renderer = 'Renderer',
}

type LogParams = [message: string, context?: LogContext];

/** Minimal logging interface consumed by game systems. */
export interface Logger {
  debug(...args: LogParams): void;
  info(...args: LogParams): void;
  warn(...args: LogParams): void;
  error(...args: LogParams): void;
}

/** Singleton logger that writes formatted entries to the browser console. */
export class ConsoleLogger extends Singleton implements Logger {
  public static get instance(): Logger {
    return super.instance as Logger;
  }

  private static readonly _dateFormat = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  debug(message: string, context: LogContext = LogContext.None): void {
    this._log(LogLevel.Debug, message, context);
  }

  info(message: string, context: LogContext = LogContext.None): void {
    this._log(LogLevel.Info, message, context);
  }

  warn(message: string, context: LogContext = LogContext.None): void {
    this._log(LogLevel.Warn, message, context);
  }

  error(message: string, context: LogContext = LogContext.None): void {
    this._log(LogLevel.Error, message, context);
  }

  /**
   * Writes a single log entry to the console.
   * Output format: `[MM/DD/YYYY, HH:MM AM]::LEVEL[::Context] - message`
   * Context is omitted when it equals `LogContext.None`.
   */
  private _log(level: LogLevel, message: string, context: LogContext) {
    const parts = [];

    parts.push(`[${ConsoleLogger._dateFormat.format(new Date())}]`);
    parts.push(level.toUpperCase());
    if (context !== LogContext.None) parts.push(context);

    const prefix = parts.join('::');
    console[level](`${prefix} - ${message}`);
  }
}
