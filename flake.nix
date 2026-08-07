{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { nixpkgs, ... } @ inputs:
  let
    packageName = "ocelot-website";
    forSupportedSystems = nixpkgs.lib.genAttrs [
      "x86_64-linux"
      "i686-linux"
      "aarch64-linux"
      "riscv64-linux"
      "aarch64-darwin"
    ];
    forSupportedPackages = forSupportedSystems ( # Create a list of nixpkgs objects
      system:
      import nixpkgs {
        inherit system;
      }
    );
  in
  {
    packages = forSupportedSystems (system:
      let
        nodeApp = forSupportedPackages.${system}.buildNpmPackage {
        pname = packageName;
        version = "0.0.1";
        src = ./.;
        npmDepsHash = "sha256-TyYMlvY81SS60aPaPI1KYMgLrzYay9OyVtTolT+fcyo="; # Placeholder: sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=
        installPhase = ''
          runHook preInstall
          mkdir -p $out/dist
          makeWrapper ${nixpkgs.lib.getExe forSupportedPackages.${system}.nodejs} $out/bin/${packageName} \
            --run "cd $out/dist" \
            --add-flags "$out/dist/index.js" \
            --set NODE_ENV production
          cp -r build/* $out/dist
          runHook postInstall
        '';
        };
      in
      {
      # The default package when nix build is run
      default = nodeApp;
      # The docker container, e.g. nix build .#docker
      docker = forSupportedPackages.${system}.dockerTools.buildImage {
        name = "${packageName}";
        tag = "latest";
        copyToRoot = nodeApp;
        config = {
          Cmd = [ "/bin/${packageName}"];
        };
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