// @ts-ignore
import { Meteor } from 'meteor/meteor';

interface ErrorCatcherErrorHandleParams {
  errorSource: 'meteor.debug' | 'node';
  error: object;
}

interface ErrorCatcherParams {
  handleError: (params: ErrorCatcherErrorHandleParams) => void;
}

/**
 * Enables universal error catcher for Node and Meteor
 * uncaught exceptions
 */
const enableErrorCatcher = async ({ handleError }: ErrorCatcherParams) => {
  if (Meteor.isServer) {
    console.log('Error Catcher Enabled');

    /**
     * Exit code 7
     * 7 - Internal Exception Handler Run-Time Failure:
     * There was an uncaught exception, and the internal fatal exception handler function itself
     * threw an error while attempting to handle it.
     */

    process.on('uncaughtException', async (error) => {
      console.error(error);

      await handleError({
        errorSource: 'node',
        error,
      });

      /** Make sure this is called last */
      setTimeout(() => process.exit(7), 0);
    });

    /** Catch all meteor's errors by hijacking Meteor._debug */
    const originalMeteorDebug = Meteor._debug;

    Meteor._debug = async function (message, stack) {
      console.error(message, stack);

      const error = new Error(message, stack || []);

      await handleError({
        errorSource: 'meteor.debug',
        error,
      });

      return originalMeteorDebug.apply(
        this,
        Array.prototype.slice.call(arguments)
      );
    };
  }
};

export { enableErrorCatcher };
