# youprefer-web

YouPrefer's webapp, built with react, redux and shit.

## Run

```console
yarn
yarn start
```

## Recipes

### HTTP and HTTPS simultaneously for local testing

```console
sudo -v # run this first and enter password when prompted
sudo yarn start -- --no-https --port 80 & sudo yarn start -- --port 443 &
```

I know how ugly its look like. It'll start **2** bg tasks, one for each
  matching port (80 for http and 443 for https).
