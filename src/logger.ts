import { LogParams } from './console_logger';

/** Minimal logging interface consumed by game systems. */
export interface Logger {
  debug(...args: LogParams): void;
  info(...args: LogParams): void;
  warn(...args: LogParams): void;
  error(...args: LogParams): void;
}

/** Broad category attached to a log entry to indicate which subsystem to associate. */
export const enum LogContext {
  None = 'None',
  Resource = 'Resource',
  Renderer = 'Renderer',
}

/** Maps to the native `console` method names used when writing each log entry. */
export const enum LogLevel {
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
}
