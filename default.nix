{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs
    nodePackages.npm
    yarn
  ];

  shellHook = ''
    echo "Node.js and npm environment loaded"
    echo "Node version: $(node --version)"
    echo "npm version: $(npm --version)"
  '';
}