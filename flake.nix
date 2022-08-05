{
  description = "Simply package MetalCar's ToDo-challenge";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    dream2nix.url = "github:nix-community/dream2nix";
  };

  outputs = { self, nixpkgs, flake-utils, dream2nix }:
    (flake-utils.lib.eachDefaultSystem (system:
      let pkgs = import nixpkgs { inherit system; };
      in {
        devShell = pkgs.mkShell { buildInputs = with pkgs; [ nodejs-16_x ]; };
        apps.default = {
          type = "app";
          program = "${pkgs.nodejs-16_x}/bin/npm";
        };
      })) // (let pkgs = import nixpkgs { system = "x86_64-linux"; };
      in dream2nix.lib.makeFlakeOutputs {
        systems = [ "x86_64-linux" ];
        config.projectRoot = ./.;
        source = ./.;
        settings = [{ subsystemInfo.nodejs = 16; }];
      });
}
