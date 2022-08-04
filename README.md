# todo-challenge

Agreed to that "compare React with jQuery" challenge during some downtime.

## How to

Requires NodeJS >= v16 and esbuild. Or just call `nix develop` if you use flakes. 

```shell
npm ci
npm run build
npm run start
```

## Todo

Figure out how to inject the `esbuild`-dependency to the `dream2nix`-flake, so we can run/build directly from git.
