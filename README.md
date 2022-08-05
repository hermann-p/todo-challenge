# todo-challenge

Agreed to that "compare React with jQuery" challenge during some downtime.

## How to

Requires NodeJS >= v16 and esbuild.

### Build and run

```shell
npm ci
npm run start
```

And visit (http://localhost:8000) 

### Dev

``` shell
npm run dev # starts the dev-server on ::8000
```

### Nix-Flake

Clone the project, then

- `nix build '.#default'` to build, or
- `nix run '.#default' -- run start` to start the server on ::8000

## Todo

Figure out how to evaluate `dream2nix` flake to be able to build directly from nix.
