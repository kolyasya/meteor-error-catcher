import { Meteor } from 'meteor/meteor';

const enableErrorCatcher = ({ errorCatcher }) => {
  if (Meteor.isServer) {
    const bound = Meteor.bindEnvironment((callback) => {
      callback();
    });

    process.on('uncaughtException', function (err) {
      bound(() => {
        errorCatcher('process uncaughtException', err);
        process.exit(7);
      });
    });

    // Catch all meteor's errors by hijacking Meteor._debug
    // Save a link
    const originalMeteorDebug = Meteor._debug;

    Meteor._debug = function (message, stack) {
      errorCatcher(message, stack);

      // Chain
      return originalMeteorDebug.apply(this, arguments);
    };
  }
};

export { enableErrorCatcher };
