import loadComponents from './components';
import loadBlocks from './blocks';
import en from './locale/en';

export default (editor, opts = {}) => {
  const options = { ...{
    i18n: {},
    // default options
  },  ...opts };

  // Add components
  loadComponents(editor, options);
  // Add blocks
  loadBlocks(editor, options);
  // Load i18n files
  editor.I18n && editor.I18n.addMessages({
      en,
      ...options.i18n,
  });

  const domc = editor.DomComponents;
  const domcConf = typeof domc.getConfig === 'function' ? domc.getConfig() : domc.config;
  if (domcConf) {
    const oldProcessor = domcConf?.processor;
    domcConf.processor = (obj) => {
      obj = { type: 'text', content: 'mock hahaha' };
      return oldProcessor ? oldProcessor(obj) : obj;
    };
  }
};