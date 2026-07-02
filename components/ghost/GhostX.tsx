/**
 * GhostX.tsx
 * Location: src/components/ghost/GhostX.tsx
 *
 * Renders Ghost's "twitter-tweet" oEmbed blockquote (twitter.com / x.com
 * links pasted into the editor) as a fully static, self-contained
 * HTML/CSS/JS card styled to match X's native dark-mode embed — not the
 * site's purple/red/orange brand gradient. Same pattern as
 * GhostYouTube.tsx: ghostTransforms.ts calls ghostXHTML() and the result
 * is injected directly via dangerouslySetInnerHTML in [slug]/page.tsx.
 *
 * NOTE ON DATA: Twitter's oEmbed blockquote does NOT include like/reply
 * counts or a profile photo — only tweet text, author, handle, URL, and
 * date. Rather than fabricate numbers, this card builds real "Reply" /
 * "Like" intent links from the tweet ID, plus a working "Copy link"
 * button with a heart-pop animation on Like and a checkmark-flash on copy.
 */

export interface GhostXTweet {
    tweetText: string;
    author: string;
    handle: string;
    tweetUrl: string;
    tweetId?: string;
    date?: string;
}

/**
 * Produces the full static markup for one embedded tweet, styled to
 * closely resemble X's native dark embed: avatar initial, name + verified
 * badge, handle, X logo, tweet body, date/view link, divider, and a
 * Reply / Like / Copy-link action row with hover + click animations.
 * No React, no hydration step required.
 */
export function ghostXHTML(tweet: GhostXTweet): string {
    const { tweetText, author, handle, tweetUrl, tweetId, date } = tweet;

    const uid = `xt-${Math.random().toString(36).slice(2, 9)}`;
    const safeAuthor = author.replace(/"/g, "&quot;");
    const safeHandle = handle.replace(/"/g, "&quot;");
    const safeUrl = tweetUrl.replace(/"/g, "&quot;");
    const jsUrl = tweetUrl.replace(/'/g, "\\'");
    const initial = (author.trim()[0] || "X").toUpperCase();

    // Deterministic-but-varied avatar tint per author, so different
    // accounts don't all render an identical gray circle.
    const tints = [
        "linear-gradient(135deg,#5b6cff,#8f5bff)",
        "linear-gradient(135deg,#ff5b7c,#ff8f5b)",
        "linear-gradient(135deg,#22a5ff,#22e0c2)",
        "linear-gradient(135deg,#ff9a3c,#ffce3c)",
        "linear-gradient(135deg,#7c5bff,#ff5bd6)",
    ];
    const tintIndex =
        Math.abs(
            author.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0),
        ) % tints.length;
    const avatarTint = tints[tintIndex];

    const profileUrl = `https://x.com/${handle}`;
    const likeUrl = tweetId
        ? `https://x.com/intent/like?tweet_id=${tweetId}`
        : tweetUrl;
    const replyUrl = tweetId
        ? `https://x.com/intent/tweet?in_reply_to=${tweetId}`
        : tweetUrl;

    const escapedText = tweetText
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br/>");

    const FONT =
        "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

    return `
<div id="${uid}" style="margin:1.75rem 0;display:flex;justify-content:center;">
  <div class="${uid}-card" style="
    width:100%;max-width:500px;font-family:${FONT};
    background:#000;border:1px solid rgba(255,255,255,0.14);border-radius:16px;
    overflow:hidden;transition:border-color 0.2s ease, box-shadow 0.2s ease;
  ">

    <div style="padding:0.85rem 1rem 0;">
      <!-- header -->
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.6rem;">
        <a href="${profileUrl}" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:0.6rem;text-decoration:none;min-width:0;">
          <div style="width:40px;height:40px;border-radius:50%;background:${avatarTint};display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700;color:#fff;font-size:1rem;font-family:${FONT};">
            ${initial}
          </div>
          <div style="min-width:0;line-height:1.25;">
            <div style="display:flex;align-items:center;gap:0.22rem;">
              <span class="${uid}-author" style="color:#e7e9ea;font-weight:700;font-size:0.95rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:220px;transition:text-decoration-color 0.15s ease;">${safeAuthor}</span>
              <svg width="16" height="16" viewBox="0 0 22 22" style="flex-shrink:0;">
                <path fill="#1d9bf0" d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.847-.972-1.422-1.247.223-.607.27-1.264.135-1.897-.135-.633-.453-1.213-.917-1.677-.464-.464-1.044-.782-1.677-.917-.633-.135-1.29-.088-1.897.135-.274-.575-.706-1.068-1.247-1.422C12.275.215 11.646.018 11 0c-.646.018-1.275.215-1.816.57-.54.354-.972.847-1.247 1.422-.607-.223-1.264-.27-1.897-.135-.633.135-1.213.453-1.677.917-.464.464-.782 1.044-.917 1.677-.135.633-.088 1.29.135 1.897-.575.274-1.068.706-1.422 1.247C.215 9.725.018 10.354 0 11c.018.646.215 1.275.57 1.816.354.54.847.972 1.422 1.247-.223.607-.27 1.264-.135 1.897.135.633.453 1.213.917 1.677.464.464 1.044.782 1.677.917.633.135 1.29.088 1.897-.135.274.575.706 1.068 1.247 1.422.54.355 1.17.552 1.816.57.646-.018 1.275-.215 1.816-.57.54-.354.972-.847 1.247-1.422.607.223 1.264.27 1.897.135.633-.135 1.213-.453 1.677-.917.464-.464.782-1.044.917-1.677.135-.633.088-1.29-.135-1.897.575-.274 1.068-.706 1.422-1.247.355-.54.552-1.17.57-1.816zm-11.226 4.74-3.422-3.422 1.197-1.197 2.225 2.225 4.692-4.692 1.197 1.197z"/>
              </svg>
            </div>
            <span style="color:#71767b;font-size:0.88rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;">@${safeHandle}</span>
          </div>
        </a>

        <div style="display:flex;align-items:center;gap:0.55rem;flex-shrink:0;">
          <a href="${profileUrl}" target="_blank" rel="noopener noreferrer" class="${uid}-followbtn" style="font-size:0.82rem;font-weight:700;color:#e7e9ea;border:1px solid rgba(255,255,255,0.3);padding:0.32rem 0.85rem;border-radius:9999px;text-decoration:none;white-space:nowrap;transition:background 0.15s ease, border-color 0.15s ease;font-family:${FONT};">Follow</a>
          <svg width="18" height="18" viewBox="0 0 24 24" style="fill:#e7e9ea;flex-shrink:0;">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </div>
      </div>

      <!-- tweet text -->
      <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;display:block;">
        <p style="color:#e7e9ea;font-size:1.15rem;line-height:1.4;margin:0.75rem 0 0.6rem;white-space:pre-wrap;word-break:break-word;font-weight:400;letter-spacing:0.1px;">${escapedText}</p>
      </a>

      <!-- date / view link -->
      <div style="margin-bottom:0.7rem;">
        <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="${uid}-viewlink" style="color:#71767b;font-size:0.84rem;text-decoration:none;transition:color 0.15s ease;">
          ${date ? date + " · " : ""}<span style="color:#1d9bf0;">View on X</span>
        </a>
      </div>
    </div>

    <div style="height:1px;background:rgba(255,255,255,0.14);"></div>

    <!-- actions -->
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0.35rem 0.6rem;">

      <a href="${replyUrl}" target="_blank" rel="noopener noreferrer" class="${uid}-actionbtn ${uid}-reply" style="display:flex;align-items:center;gap:0.3rem;text-decoration:none;color:#71767b;padding:0.45rem 0.7rem;border-radius:9999px;transition:color 0.15s ease, background 0.15s ease;">
        <span class="${uid}-iconwrap" style="display:flex;align-items:center;justify-content:center;">
          <svg width="18" height="18" viewBox="0 0 24 24" style="fill:none;stroke:currentColor;stroke-width:2;">
            <path d="M3 12c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9c-1.36 0-2.65-.3-3.8-.85L3 21l1.04-4.16A8.94 8.94 0 0 1 3 12z"/>
          </svg>
        </span>
        <span style="font-size:0.82rem;">Reply</span>
      </a>

      <button
        type="button"
        class="${uid}-actionbtn ${uid}-likebtn"
        style="display:flex;align-items:center;gap:0.3rem;background:none;border:none;cursor:pointer;color:#71767b;padding:0.45rem 0.7rem;border-radius:9999px;transition:color 0.15s ease, background 0.15s ease;font-family:${FONT};"
        onclick="
          var win=window.open('${likeUrl}','_blank','noopener,noreferrer');
          var heart=this.querySelector('.${uid}-heart');
          if(heart){
            heart.style.transition='none';
            heart.style.transform='scale(1)';
            requestAnimationFrame(function(){
              heart.style.transition='transform 0.35s cubic-bezier(.17,.89,.32,1.49)';
              heart.style.transform='scale(1.35)';
              setTimeout(function(){ heart.style.transform='scale(1)'; }, 200);
            });
          }
        "
      >
        <span class="${uid}-iconwrap ${uid}-heart" style="display:flex;align-items:center;justify-content:center;">
          <svg width="18" height="18" viewBox="0 0 24 24" style="fill:none;stroke:currentColor;stroke-width:2;">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </span>
        <span style="font-size:0.82rem;">Like</span>
      </button>

      <button
        type="button"
        class="${uid}-actionbtn ${uid}-copybtn"
        style="display:flex;align-items:center;gap:0.3rem;background:none;border:none;cursor:pointer;color:#71767b;padding:0.45rem 0.7rem;border-radius:9999px;transition:color 0.15s ease, background 0.15s ease;font-family:${FONT};"
        onclick="
          var btn=this;
          navigator.clipboard.writeText('${jsUrl}').then(function(){
            var icon=btn.querySelector('.${uid}-copyicon');
            var label=btn.querySelector('.${uid}-copylabel');
            if(icon) icon.style.display='none';
            var check=btn.querySelector('.${uid}-checkicon');
            if(check) check.style.display='flex';
            if(label) label.textContent='Copied';
            btn.classList.add('${uid}-copied');
            setTimeout(function(){
              if(icon) icon.style.display='flex';
              if(check) check.style.display='none';
              if(label) label.textContent='Copy link';
              btn.classList.remove('${uid}-copied');
            }, 1700);
          });
        "
      >
        <span class="${uid}-iconwrap ${uid}-copyicon" style="display:flex;align-items:center;justify-content:center;">
          <svg width="18" height="18" viewBox="0 0 24 24" style="fill:none;stroke:currentColor;stroke-width:2;">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
        </span>
        <span class="${uid}-iconwrap ${uid}-checkicon" style="display:none;align-items:center;justify-content:center;">
          <svg width="18" height="18" viewBox="0 0 24 24" style="fill:none;stroke:currentColor;stroke-width:2.4;">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </span>
        <span class="${uid}-copylabel" style="font-size:0.82rem;">Copy link</span>
      </button>
    </div>
  </div>

  <style>
    #${uid} .${uid}-card:hover { border-color: rgba(255,255,255,0.24); }
    #${uid} .${uid}-author:hover { text-decoration: underline; }
    #${uid} .${uid}-viewlink:hover { color: #a6abb0; }
    #${uid} .${uid}-followbtn:hover { background: rgba(231,233,234,0.1); }

    #${uid} .${uid}-reply:hover { color: #1d9bf0; background: rgba(29,155,240,0.1); }
    #${uid} .${uid}-likebtn:hover { color: #f91880; background: rgba(249,24,128,0.1); }
    #${uid} .${uid}-copybtn:hover { color: #00ba7c; background: rgba(0,186,124,0.1); }
    #${uid} .${uid}-copybtn.${uid}-copied { color: #00ba7c; }

    #${uid} .${uid}-actionbtn .${uid}-iconwrap { transition: transform 0.15s ease; }
    #${uid} .${uid}-reply:hover .${uid}-iconwrap { transform: scale(1.08); }
    #${uid} .${uid}-copybtn:hover .${uid}-iconwrap { transform: scale(1.08); }
    #${uid} .${uid}-likebtn:active .${uid}-heart { transform: scale(0.85); }
  </style>
</div>`.trim();
}