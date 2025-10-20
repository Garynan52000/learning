import './app.css';
import grapesjs from 'grapesjs';
import zh from 'grapesjs/locale/zh';
import GjsEditor from '@grapesjs/react';
import type { Editor } from 'grapesjs';
import Root from './components/root';

export default function App() {
  const onEditor = (editor: Editor) => {
    console.log('Editor loaded', { editor });
  };

  return (
    <GjsEditor
      // Pass the core GrapesJS library to the wrapper (required).
      // You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
      grapesjs={grapesjs}
      // Load the GrapesJS CSS file asynchronously from URL.
      // This is an optional prop, you can always import the CSS directly in your JS if you wish.
      grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
      // GrapesJS init options
      options={{
        i18n: {
          locale: 'zh',
          messages: {
            zh
          }
        },
        storageManager: false,
        domComponents: {
          processor: (obj) => {
            if (obj.$$typeof === Symbol.for('react.element')) {
              // react vdom
              return {
                type: 'text',
                tagName: 'h1',
                content: 'react component',
              };
            }
            // return obj;
          }
        },
        components: [
          { something: 'something' },
          '<div>grapes component</div>',
          <div>test</div>,
          <Root />
        ] as any
      }}
      onEditor={onEditor}
    />
  );
}

export {
  App
}
