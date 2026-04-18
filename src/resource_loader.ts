import type p5 from 'p5';
import { ImageName } from './image_loader';

/**
 * Generic contract for loading and caching p5 resources by name.
 */
export interface ResourceLoader<T> {
  /** Called during the p5 `preload` phase to queue assets before `setup` runs. */
  preload(p: p5): void;
  /** Returns the cached resource, loading upon first access. */
  load(p: p5, name: ImageName): T | null;
  /** Marks a cached entry as stale so the next `load` fetches it again. */
  unload(name: ImageName): void;
  /** Drops the entire cache. */
  clear(): void;
}
