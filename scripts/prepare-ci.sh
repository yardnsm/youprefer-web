#!/usr/bin/env bash

# Create a new config file for production deployment

# --------------------------------------------------------------------------------------------------

declare -r APP_CONFIG_SAMPLE="./src/config/app-config.sample.js"
declare -r APP_CONFIG_DEST="./src/config/app-config.js"

main() {
  if [[ -z "$CI" ]] || [[ -f "$APP_CONFIG_DEST" ]]; then
    return 1
  fi

  cp "$APP_CONFIG_SAMPLE" "$APP_CONFIG_DEST"

  sed -i '' "s/{{ FIREBASE_API_KEY }}/$FIREBASE_API_KEY/" "$APP_CONFIG_DEST"
  sed -i '' "s/{{ FIREBASE_AUTH_DOMAIN }}/$FIREBASE_AUTH_DOMAIN/" "$APP_CONFIG_DEST"
  sed -i '' "s/{{ FIREBASE_DATABASE_URL }}/$FIREBASE_DATABASE_URL/" "$APP_CONFIG_DEST"
  sed -i '' "s/{{ FIREBASE_PROJECT_ID }}/$FIREBASE_PROJECT_ID/" "$APP_CONFIG_DEST"
  sed -i '' "s/{{ ADSENSE_CLIENT }}/$ADSENSE_CLIENT/" "$APP_CONFIG_DEST"
  sed -i '' "s/{{ ADSENSE_SLOT }}/$ADSENSE_SLOT/" "$APP_CONFIG_DEST"
  sed -i '' "s/{{ GA_TRACKING_ID }}/$GA_TRACKING_ID/" "$APP_CONFIG_DEST"
}

main "$@"
