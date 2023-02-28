---
title: Strapi
description: A self-hosted version of Strapi using a Postgres database
tags:
  - strapi
  - postgresql
  - cms
  - javascript
---

# Strapi example

This example deploys self-hosted version of [Strapi](https://strapi.io/). Internally it uses a PostgreSQL database to store the data.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/strapi?referralCode=milo)

## ✨ Features

- Strapi
- Postgres
  - For local developement sqlite with the package better-sqlite is configured based on the nodejs environment that is used. See ./config/database.js and ./config/env/production/database.js

## 💁‍♀️ How to use

- Click the Railway button 👆
- Add the environment variables
  - If you do not add the Cloudinary related environment variables, your images/files will not be persisted between deploys.

## 📝 Notes

- After your app is deployed, visit the `/admin` endpoint to create your admin user.
- Railway's filesystem is ephemeral which is why any changes to the filesystem are not persisted between deploys. This is why, this example uses Cloudinary for storage.
- This template does support the strapi data transfer feature, see <https://docs.strapi.io/dev-docs/data-management/transfer> .

## Local Development

- Up first you need a valid .env file to run this locally. Edit the .env.example (cloudinary is optional) and rename it to .env . See the current strapi documentation for examples and what those values are used for.
  - Do not add this to your github-repository!
- Build your strapi admin interface: 'yarn build'
- And run it with 'yarn dev'
- After your app is running, visit the `http://localhost:1337/admin` endpoint to create your admin user.
