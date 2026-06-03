import type { SVGProps } from 'react';

export default function PluginIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...props}>
      <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1.5V8h4.5L14 3.5zM7 11h10v2H7v-2zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />
    </svg>
  );
}

