import './style.css';
import '@vscode-elements/elements/dist/vscode-button';
import '@vscode-elements/elements/dist/vscode-checkbox';
import '@vscode-elements/elements/dist/vscode-form-group';
import '@vscode-elements/elements/dist/vscode-label';
import '@vscode-elements/elements/dist/vscode-single-select';
import '@vscode-elements/elements/dist/vscode-multi-select';
import '@vscode-elements/elements/dist/vscode-option';
import '@vscode-elements/elements/dist/vscode-radio';
import '@vscode-elements/elements/dist/vscode-radio-group';
import '@vscode-elements/elements/dist/vscode-textfield';
import { createApp } from 'vue';
import App from './App.vue';

if (import.meta.env.DEV) {
  await import('@vscode-elements/webview-playground');
}

createApp(App).mount('#app');
