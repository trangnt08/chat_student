'use strict';

const WIT_TOKEN = process.env.WIT_TOKEN || '3YNNTFAQDIP76VLTFSKLMMNAZOGJWD7N'
if (!WIT_TOKEN) {
  throw new Error('Missing WIT_TOKEN. Go to https://wit.ai/docs/quickstart to get one.')
}


var FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN || 'EAAVMi6ykpokBAMmZBPsOHQi5k5wfbAGRtu7Kt8rprQJFN4LclZBhrT6tX5ZBUrXqzZBs3LLeQEq3gFPeyuy6E3cup8zrMXEMFBq24srQuQjvOMZAtKEB18SKIA4Sf0XxrQvBhYkuC2fhZCUzzgQBBkoI8Jo9qscefx0oFgOpSxqQZDZD';
if (!FB_PAGE_TOKEN) {
	throw new Error('Missing FB_PAGE_TOKEN. Go to https://developers.facebook.com/docs/pages/access-tokens to get one.')
}

var FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN || 'welcome_to_fb_nguyen_thuy_trang'

module.exports = {
  WIT_TOKEN: WIT_TOKEN,
  FB_PAGE_TOKEN: FB_PAGE_TOKEN,
  FB_VERIFY_TOKEN: FB_VERIFY_TOKEN,
}
