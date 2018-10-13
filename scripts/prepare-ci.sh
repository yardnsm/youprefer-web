#!/usr/bin/env bash

# Create a blank new config file just for the sake of testing

# ---------------------------------------------

main() {
  if [[ -z "$TRAVIS" ]] || [[ -z "$CI" ]] ; then
    return 1
  fi

  cp ./src/config/app-config.sample.js ./src/config/app-config.js
}

main "$@"
