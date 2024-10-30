#!/bin/bash

boldinfo() {
  tput bold
  tput setaf 45
  echo -e "INFO:$(tput sgr0) $1\n"
}

bolderr() {
  tput bold
  tput setaf 1
  echo -e "Error:$(tput sgr0) $1\n"
}

boldinfo "Install Xcode CLI"
xcode-select --install

if ! command -v xcrun simctl &>/dev/null; then
  bolderr "Failed to install Xcode CLI"
  exit 1
fi

boldinfo "Installing default simulator"
xcrun simctl create 'default' 'iPhone SE (3rd generation)'

if ! command -v npx &>/dev/null; then
  boldinfo "Node environment is required: Attemping to install Node with Homebrew"
  brew install node@18
fi

npx install-expo-modules@latest

if ! command -v yarn &>/dev/null; then
  npm install --global yarn
fi

yarn install -g eas-cli

boldinfo "Installing Ruby dependencies from Gemfile"
if ! command -v bundle &>/dev/null; then
  gem install bundle
fi

bundle install
brew install watchman
