import React, { useEffect, useRef } from 'react';
import { getValueFromLocalStorage } from '../../utils/localStorage';

const origin = 'https://utteranc.es';

function getTheme() {
  return getValueFromLocalStorage('isDarkMode') ? 'photon-dark' : 'github-light';
}

function Utterances({ repo, path }) {
  const root = useRef(null);

  useEffect(() => {
    const container = root.current;
    const script = document.createElement('script');
    const attributes = {
      src: origin + '/client.js',
      repo,
      'issue-term': path,
      theme: getTheme(),
      crossorigin: 'anonymous',
    };
    Object.entries(attributes).forEach(([name, value]) => script.setAttribute(name, value));
    script.async = true;
    container.appendChild(script);

    function syncTheme() {
      container.querySelector('iframe.utterances-frame')?.contentWindow?.postMessage(
        { type: 'set-theme', theme: getTheme() },
        origin,
      );
    }

    window.addEventListener('theme', syncTheme);
    return () => {
      window.removeEventListener('theme', syncTheme);
      container.replaceChildren();
    };
  }, [repo, path]);

  return (
    <section aria-label="댓글" style={{ width: '100%', margin: '32px 0' }}>
      <h2>댓글</h2>
      <div ref={root} />
    </section>
  );
}

export default Utterances;
