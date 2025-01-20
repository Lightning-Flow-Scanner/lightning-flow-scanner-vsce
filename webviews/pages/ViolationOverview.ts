/**
 * ts-ignore is for rollup plugin to resolve svelte components
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import App from '../components/ViolationOverview.svelte';

const ViolationOverview = new App({
  target: document.body,
});

export default ViolationOverview;
