import {
  ListMapArticles as ListMapArticlesType,
  ListMapCards as ListMapCardsType,
} from '../constants/type';

import { ReverseMap } from '~/utils/convert.util';

// define cache keys & types here
// to be aware & manage
export enum CacheKey {
  accessToken = 'accessToken',
  ListMapCards = 'ListMapCards',
  ListMapArticles = 'ListMapArticles',
}

type CacheValues = {
  [CacheKey.accessToken]: string;
  [CacheKey.ListMapCards]: ListMapCardsType;
  [CacheKey.ListMapArticles]: ListMapArticlesType;
};
type CacheKeysType = ReverseMap<typeof CacheKey>;
type CacheValueType = ReverseMap<CacheValues>;

export class CacheService {
  // Singleton: only 1 cache, can't be override
  private cache;

  // eslint-disable-next-line class-methods-use-this
  createInstance() {
    const object = new Map();
    return object;
  }

  getInstance() {
    if (!this.cache) {
      this.cache = this.createInstance();
    }
    return this.cache;
  }

  get(key: CacheKeysType): CacheValueType | null {
    const cache = this.getInstance();
    const value = cache.get(key);
    if (value) {
      let result;

      if (!value.expired || (value.expired && value.expired >= Date.now())) {
        result = value.data;
      } else {
        cache.delete(key);
      }

      return result;
    }
    return null;
  }

  put(key: CacheKeysType, value: CacheValueType, expired?): void {
    const cache = this.getInstance();
    cache.set(key, {
      data: value,
      expired,
    });
  }
}
// only 1 instance
export const cacheServiceInstance = new CacheService();
