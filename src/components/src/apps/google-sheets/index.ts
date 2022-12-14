import {createComponent} from '../../framework/component';
import {insertColumnAction} from './actions/insert-column.action';
import {insertRowAction} from './actions/insert-row.action';

export const googleSheets = createComponent({
	name: 'Google Sheets',
	logoUrl: 'https://cdn.activepieces.com/components/googlesheets/logo.png',
	actions: [insertColumnAction, insertRowAction],
	triggers: [],
});
