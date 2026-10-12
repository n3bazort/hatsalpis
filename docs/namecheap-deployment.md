# Automatic landing deployment

WordPress is installed separately in `/store`. The deployment only uploads
the landing assets and HTML; it never deletes remote files or changes WordPress.

## One-time hosting setup

1. Enable SSH in cPanel's Manage Shell. Confirm the server hostname, SSH port,
   and cPanel username with Namecheap. The server must have rsync installed.
2. Create a dedicated deployment SSH key, without a passphrase, and authorize
   its public key using cPanel SSH Access. Keep the private key secret.
3. Obtain and verify the server SSH host-key fingerprint with Namecheap before
   storing its corresponding known_hosts entry. Do not disable host verification.
4. In GitHub, create the environment `namecheap-production` and add secrets:
   - `NAMECHEAP_HOST`: actual hosting server, not the Cloudflare-proxied domain.
   - `NAMECHEAP_USER`: cPanel username.
   - `NAMECHEAP_PORT`: SSH port confirmed by the provider.
   - `NAMECHEAP_SSH_KEY`: dedicated private deployment key.
   - `NAMECHEAP_KNOWN_HOSTS`: verified known_hosts entry (including port when nonstandard).
5. Add repository Actions variable `NAMECHEAP_DEPLOY_ENABLED` = `true` only
   after the credentials and `/home/USER/public_html` destination are confirmed.
6. Run `Publish landing to Namecheap` from Actions. Check the landing's assets,
   images, desktop/mobile layout, and `/store` after the first deployment.

Every subsequent push to main builds and deploys the landing automatically.
Directories are set to 755 and files to 644, including nested photo folders.
Assets upload before index.html. Older assets remain to avoid breaking open tabs.
The existing GitHub Pages publication remains available as a preview.

## Status

The workflow is prepared but remains disabled until hosting access is configured.
Repository access alone does not grant access to cPanel or the hosting server.
