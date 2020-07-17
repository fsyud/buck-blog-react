import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'articledetailmodels', ...(require('/Volumes/WorkSpace/Buck-blog-react/src/models/articledetailmodels.ts').default) });
app.model({ namespace: 'articlemodel', ...(require('/Volumes/WorkSpace/Buck-blog-react/src/models/articlemodel.ts').default) });
app.model({ namespace: 'boardmodel', ...(require('/Volumes/WorkSpace/Buck-blog-react/src/models/boardmodel.ts').default) });
app.model({ namespace: 'commentmodel', ...(require('/Volumes/WorkSpace/Buck-blog-react/src/models/commentmodel.ts').default) });
app.model({ namespace: 'global', ...(require('/Volumes/WorkSpace/Buck-blog-react/src/models/global.ts').default) });
app.model({ namespace: 'projectmodel', ...(require('/Volumes/WorkSpace/Buck-blog-react/src/models/projectmodel.ts').default) });
app.model({ namespace: 'timelinemodel', ...(require('/Volumes/WorkSpace/Buck-blog-react/src/models/timelinemodel.ts').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
