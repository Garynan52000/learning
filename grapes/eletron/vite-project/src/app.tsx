import './app.css';
import grapesjs from 'grapesjs';
import zh from 'grapesjs/locale/zh';
import GjsEditor from '@grapesjs/react';
import type { Editor } from 'grapesjs';
import Root from './components/root';
import Body from './components/body';

// 将 React 虚拟 DOM 转换为 GrapesJS 组件格式
function convertVdomToGrapesComponent(vdom: any): any {
  if (!vdom) {
    return { type: 'text', content: '' };
  }
  
  // 处理字符串或数字
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return {
      type: 'text',
      content: String(vdom)
    };
  }
  
  // 处理 React 元素
  if (vdom.$typeof === Symbol.for('react.element')) {
    const { type, props } = vdom;
    const { children, ...attributes } = props || {};
    
    // 处理子元素
    let components = [];
    if (children) {
      if (Array.isArray(children)) {
        components = children.map(child => convertVdomToGrapesComponent(child));
      } else {
        components = [convertVdomToGrapesComponent(children)];
      }
    }
    
    return {
      type: 'default',
      tagName: typeof type === 'string' ? type : 'div',
      attributes,
      components
    };
  }
  
  // 处理数组
  if (Array.isArray(vdom)) {
    return vdom.map(item => convertVdomToGrapesComponent(item));
  }
  
  // 其他情况
  return {
    type: 'text',
    content: String(vdom)
  };
}

// 格式化 components 数组
function normalizeComponents(arr: any[]): any[] {
  const result: any[] = [];
  
  for (const item of arr) {
    if (Array.isArray(item)) { // 将所有子数组展开
      // 如果是数组，递归调用并展开结果
      result.push(...normalizeComponents(item));
    } else if (typeof item === 'string' || typeof item === 'number') {
      // 如果不是数组，直接添加到结果中
      result.push(String(item));
    }
  }
  
  return result;
}

export default function App() {
  const onEditor = (editor: Editor) => {
    console.log('Editor loaded', { editor });
  };

  return <>
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
            debugger;
            if (obj.$$typeof === Symbol.for('react.element')) {
              // react obj
              let vdom;
              if (typeof obj.type === 'function') {
                // 判断是类组件还是函数组件
                if (obj.type.prototype && obj.type.prototype.isReactComponent) {
                  // 类组件：先实例化，再调用 render 方法获取 vdom
                  const _instance = new obj.type(obj.props);
                  vdom = _instance.render();
                } else {
                  // 函数组件：直接执行函数获取 vdom
                  vdom = obj.type(obj.props);
                }
                debugger;
              } else {
                // 普通标签：直接返回 obj
                vdom = obj;
              }
              return {
                type: 'text',
                tagName: 'h1',
                content: 'react component',
              };
            }
          }
        },
        components: [
          { something: 'something' },
          '<div>grapes component</div>',
          [undefined, null, true, 1, '2'],
          <Root />,
          <Body />
        ] as any
      }}
      onEditor={onEditor}
    />
  </>;
}

export {
  App
}
