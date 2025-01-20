/**
 * ts-ignore is for rollup plugin to resolve svelte components
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Component from '../components/RuleOverview.svelte';

const Overview = new Component({
  target: document.body,
});

export default Overview;
