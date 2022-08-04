# todo-challenge

Agreed to that "compare React with jQuery" challenge during some downtime.

## How to

Requires NodeJS >= v16 and esbuild. Or just call `nix develop` if you use flakes.

### Build and run

```shell
npm ci
npm run build
npm run start
```

And visit (http://localhost:8000) 

### Dev

``` shell
npm run start # starts the json-server mock-database on ::8000
npm run dev # starts the dev-server on ::8001
```

And visit (http://localhost:8001) (no hot reloading, refresh for results)

`

## Todo

Figure out how to inject the `esbuild`-dependency to the `dream2nix`-flake, so we can run/build directly from git.
