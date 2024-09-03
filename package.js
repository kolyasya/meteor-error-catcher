Package.describe({
  name: 'kolyasya:meteor-error-catcher',
  version: '0.0.1-beta.3',
  summary: 'Catch all server errors',
  git: 'https://github.com/kolyasya/meteor-error-catcher.git',
  documentation: './README.md',
});

Package.onUse((api) => {
  api.use('ecmascript@0.16.8');
  api.use('typescript@5.4.3');
  api.use('zodern:types@1.0.13');

  api.mainModule('./index.ts', ['server']);
});
