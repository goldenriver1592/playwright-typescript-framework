import { mergeTests, expect } from '@playwright/test';
import { test as pageFixtures } from './pages';
import { test as apiFixtures }  from './api';

export const test = mergeTests(pageFixtures, apiFixtures);

export { expect } from '@playwright/test'; 
