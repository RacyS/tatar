(() => {
  const hash = window.location.hash;
  // Identity email links and existing CMS bookmarks must still reach Decap.
  const hasAuthToken = /(?:^#|&)(?:invite_token|confirmation_token|recovery_token|email_change_token|access_token)=/.test(hash);
  const isCmsRoute = /^#\/(?:collections|media|workflow)(?:\/|$)/.test(hash);
  if (hasAuthToken || isCmsRoute) {
    window.location.replace('/admin/editor.html' + window.location.search + hash);
  }
})();
