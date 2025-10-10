import "@grapesjs/studio-sdk/style";
import css from "./App.module.scss";

import StudioEditor from "@grapesjs/studio-sdk/react";

import type { ReactNode } from "react";

function App(): ReactNode {
  return <StudioEditor
    className={css.editor}
    options={{
      licenseKey: "7b1fb798e8124614ba6439f288492644fadee19f701340d095b3eace07c6d14b",
      gjsOptions: {
        storageManager: {
          type: 'local',
        },
      },
      project: {
        type: 'web',
        // The default project to use for new projects
        default: {
          pages: [
            { name: 'Home', component: '<h1>Home page</h1>' },
            { name: 'About', component: '<h1>About page</h1>' },
            { name: 'Contact', component: '<h1>Contact page</h1>' },
          ]
        },
      },
    }}
  />;
}

export default App;
