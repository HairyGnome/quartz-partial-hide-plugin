import { QuartzTransformerPlugin } from '@quartz-community/types';
export { PageGenerator, PageMatcher, QuartzComponent, QuartzComponentConstructor, QuartzComponentProps, QuartzEmitterPlugin, QuartzFilterPlugin, QuartzPageTypePlugin, QuartzPageTypePluginInstance, QuartzTransformerPlugin, StringResource, VirtualPage } from '@quartz-community/types';
import { PartialHideTransformerOptions } from './types.js';

/**
 * Transformer plugin that removes hidden sections from source at build time
 */
declare const PartialHideTransformer: QuartzTransformerPlugin<Partial<PartialHideTransformerOptions>>;

export { PartialHideTransformer, PartialHideTransformerOptions };
