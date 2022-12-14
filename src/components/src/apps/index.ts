import {slack} from './slack/index';
import type {Component} from '../framework/component';
import {googleSheets} from './google-sheets';

export const apps: Component[] = [
	slack,
	googleSheets,
];
