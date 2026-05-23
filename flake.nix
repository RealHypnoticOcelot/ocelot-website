{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { nixpkgs, ... } @ inputs:
  let
    forSupportedSystems = nixpkgs.lib.genAttrs [
      "x86_64-linux"
      "i686-linux"
      "aarch64-linux"
      "riscv64-linux"
      "aarch64-darwin"
    ];
    forSupportedPackages = forSupportedSystems ( # Create a list of nixpkgs objects with the bun2nix overlay
      system:
      import nixpkgs {
        inherit system;
      }
    );
  in
  {
    packages = forSupportedSystems (system: {
      # Produce a package for this template with bun2nix in
      # the overlay
      default = forSupportedPackages.${system}.buildNpmPackage {
        pname = "ocelot-website";
        version = "0.0.1";
        src = ./.;
        npmDepsHash = "sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
      };
    });

    devShells = forSupportedSystems ( # Dev shell is what you get when you run nix develop
      system: {
        default = forSupportedPackages.${system}.mkShell {
          packages = with forSupportedPackages.${system}; [
            nodejs
          ];
        };
      }
    );
  };
}
# Run `nix develop` to enter the shell, and run `exit` to leave the shell