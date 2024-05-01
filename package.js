Package.describe({
  name: 'kolyasya:meteor-error-catcher',
  version: '0.0.1-beta.0',
  summary: 'Catch all server errors',
  git: 'https://github.com/kolyasya/meteor-error-catcher.git',
  documentation: './README.md',
});

Package.onUse((api) => {
  api.use('ecmascript');
  api.use('typescript');
  api.use('zodern:types');

  api.mainModule('./index.ts', ['server']);
});
