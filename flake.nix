{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    bun2nix = {
      url = "github:nix-community/bun2nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
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
        overlays = [ inputs.bun2nix.overlays.default ]; # You must use inputs here, because we refer to bun2nix as a package in devshells
      }
    );
  in
  {
    packages = forSupportedSystems (system: {
      # Produce a package for this template with bun2nix in
      # the overlay
      default = forSupportedPackages.${system}.stdenv.mkDerivation {
        pname = "ocelot-website";
        version = "0.0.1";

        meta = {
          mainProgram = "ocelot-website"; # Corresponds to the bin in makeWrapper below
        };

        src = ./.;

        nativeBuildInputs = [
          inputs.bun2nix.packages.${system}.default.hook
          forSupportedPackages.${system}.makeWrapper
        ];

        bunDeps = inputs.bun2nix.packages.${system}.default.fetchBunDeps {
          bunNix = ./bun.nix;
        };

        buildPhase = ''
          bun run build
        '';

        installPhase = ''
          mkdir -p $out/dist
          mkdir -p $out/bin
          makeWrapper ${nixpkgs.lib.getExe forSupportedPackages.${system}.bun} $out/bin/ocelot-website \
            --run "cd $out/dist" \
            --add-flags "$out/dist/index.js" \
            --set NODE_ENV production

          cp -R ./build/* $out/dist/
        '';
      };
    });

    devShells = forSupportedSystems ( # Dev shell is what you get when you run nix develop
      system: {
        default = forSupportedPackages.${system}.mkShell {
          packages = with forSupportedPackages.${system}; [
            bun
            bun2nix
          ];
          shellHook = ''
            bun install --frozen-lockfile
          '';
        };
      }
    );
  };
}
# Run `nix develop` to enter the shell, and run `exit` to leave the shell