{
  description = "Simply package MetalCar's ToDo-challenge";

  inputs = { flake-utils.url = "github:numtide/flake-utils"; };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        root = builtins.toString ./.;
      in {
        packages.default = { };

        devShell =
          pkgs.mkShell { buildInputs = with pkgs; [ nodejs-16_x esbuild ]; };

      });

}
