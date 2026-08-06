/** Console-backed stub replacing the backend pino logger in the DOCX bundle. */
const logger = {
    info: (...args: unknown[]) => console.log(...args),
    warn: (...args: unknown[]) => console.warn(...args),
    error: (...args: unknown[]) => console.error(...args),
    debug: () => {},
};
export default logger;
