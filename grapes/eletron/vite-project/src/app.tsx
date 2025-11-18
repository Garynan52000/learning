import './app.css';
import grapesjs from 'grapesjs';
import zh from 'grapesjs/locale/zh';
import GjsEditor from '@grapesjs/react';
import type { Editor } from 'grapesjs';
import Root from './components/root';

function isReactObject(obj: any): boolean {
  return obj && obj.$$typeof === Symbol.for('react.element');
}

function isReactComonent(obj: any): boolean {
  if (!isReactObject(obj)) {
    return false;
  }
  return typeof obj.type === 'function';
}

function isReactClassComponent(obj: any): boolean {
  if (!isReactComonent(obj)) {
    return false;
  }
  return obj.type.prototype && obj.type.prototype.isReactComponent;
}

function isReactFunctionComponent(obj: any): boolean {
  if (!isReactComonent(obj)) {
    return false;
  }
  return !isReactClassComponent(obj);
}

// 将 React 虚拟 DOM 转换为 GrapesJS 组件格式
function convertVdomToGrapesComponent(obj: any): any {
  if (isReactObject(obj)) {
    // react obj
    debugger;
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
    } else {
      // 普通标签：直接返回 obj
      vdom = obj;
    }
    if (typeof vdom === 'string' || typeof vdom === 'number') {
      return { type: 'textnode', content: String(vdom) };
    } else if (typeof vdom === 'object' && vdom) {
      const { children: _children, ..._props } = vdom.props;
      let _type = 'default';
      const _tagName = vdom.type;
      const _components = Array.isArray(_children) ? flatArrary(_children) : _children;
      switch (true) {
        case typeof _components === 'string' || typeof _components === 'number':
          _type = 'text';
          break;
        case typeof _components === 'object' && _components:
          _type = 'span';
          break;
        default:
          _type = 'default';
          break;
      }
      return { ..._props, type: _type, tagName: _tagName, components: _components };
    } else {
      return { type: 'textnode', content: '' };
    }
  }
}

// 格式化 components 数组
function flatArrary(arr: any[]): any[] {
  const result: any[] = [];
  
  for (const item of arr) {
    if (Array.isArray(item)) { // 将所有子数组展开
      // 如果是数组，递归调用并展开结果
      result.push(...flatArrary(item));
    } else {
      // 如果不是数组，直接添加到结果中
      result.push(item);
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
        components: [
          { something: 'something' },
          '<div>grapes component</div>',
          <Root />,
        ] as any
      }}
      onEditor={onEditor}
    />
  </>;
}

export {
  App
}
