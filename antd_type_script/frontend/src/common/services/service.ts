/*
 * Copyright (c) 2020. Prototype
 */

import { get } from '../rest';

export const fetchAppSettings = () => get(`/v1.0/settings`);
