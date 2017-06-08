## Recipes

### HTTP and HTTPS simultaneously

```console
sudo -v # run this first and enter password when prompted
sudo yarn start -- --no-https --port 80 & sudo yarn start -- --port 443 &
```

I know how ugly its look like. It'll start **2** bg tasks, one of each
  matching port (80 for http and 443 for https).
