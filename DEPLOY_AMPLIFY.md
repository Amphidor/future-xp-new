# Deploy Future XP Frontend to AWS Amplify

This Next.js app is configured for **AWS Amplify Hosting** (SSR support).

## What’s already set up

- **`amplify.yml`** – Build spec: `npm ci` → `npm run build`, artifacts from `.next`, cache for `node_modules` and `.next/cache`.
- **`next.config.js`** – Valid Next config so the Amplify build runs correctly.

## Deploy steps

### 1. Push code to GitHub

Ensure your repo is connected and your branch is pushed:

```bash
git add .
git commit -m "Configure for Amplify"
git push origin main
```

(Use your real branch name if it’s not `main`.)

### 2. Create the app in Amplify

1. Open [AWS Amplify Console](https://console.aws.amazon.com/amplify/).
2. **Create new app** → **Host web app**.
3. Choose **GitHub** and authorize if needed.
4. Pick repo: `FutureXP-Student-Portal/futurexp-frontend-next` and the branch (e.g. `main`).
5. Amplify will detect Next.js and use the repo’s `amplify.yml` (no need to change build settings if the file is in the root).
6. (Optional) Add **environment variables** in **App settings → Environment variables**, e.g.:
   - `NEXT_PUBLIC_*` for any public env vars your app uses.
7. **Save and deploy**.

### 3. After first deploy

- Amplify will run `npm ci` and `npm run build` and deploy from `.next`.
- Your app URL will be like: `https://main.xxxxx.amplifyapp.com`.
- For a custom domain, use **Domain management** in the Amplify app.

## Environment variables

If you use env vars (e.g. API base URL), add them in Amplify:

- **App settings** → **Environment variables**.
- Add each variable for the right branch (e.g. `main`).
- Redeploy after changing env vars.

## Node version (if needed)

To pin Node in the build, add in `amplify.yml` under `preBuild.commands`:

```yaml
- nvm install 18
- nvm use 18
- npm ci
```

Then run your existing build commands as you have them now.
