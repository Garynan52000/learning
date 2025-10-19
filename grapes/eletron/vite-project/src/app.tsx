import './app.css';
import grapesjs from 'grapesjs';
import zh from 'grapesjs/locale/zh';
import GjsEditor from '@grapesjs/react';
import type { Editor } from 'grapesjs';

export default function App() {
  const onEditor = (editor: Editor) => {
    console.log('Editor loaded', { editor });
    editor.addComponents([
      
    ])
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
        components: [
          `<h1><span>标题</span></h1>`,
          {
            type: 'image',
            attributes: { src: 'https://img-game.yy.com/f2e/activity/ssfh/assets/imgs/yy/%E9%9D%93%E5%8F%B7%E7%9A%87%E6%97%8F.png' },
          }
        ] as any
      }}
      onEditor={onEditor}
    />
  );
}

export {
  App
}
