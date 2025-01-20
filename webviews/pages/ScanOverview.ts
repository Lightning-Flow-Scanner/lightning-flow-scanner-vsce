/**
 * ts-ignore is for rollup plugin to resolve svelte components
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Component from '../components/ScanOverview.svelte';

const ScanOverview = new Component({
  target: document.body,
});

export default ScanOverview;
