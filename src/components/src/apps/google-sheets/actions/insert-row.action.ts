import {HttpMethod} from '../../../common/http/core/http-method';
import {createAction} from '../../../framework/action/action';
import {InputDataType} from '../../../framework/config/input-data-type.model';
import {InputRequestLocation} from '../../../framework/config/input-request-location.model';
import {InputUiType} from '../../../framework/config/input-ui-type.model';
import {appendGoogleSheetValues, Dimension, ValueInputOption} from './utils';

export const insertRowAction = createAction({
	name: 'Insert Row',
	description: 'Append values to an existing sheet you have access to',
	url: 'https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}:append',
	httpMethod: HttpMethod.POST,
	configs: [
		{
			name: 'range',
			displayName: 'Range',
			description: 'The A1 notation of a range to search for a logical table of data. Values are appended after the last row of the table.\n https://developers.google.com/sheets/api/guides/concepts#cell',
			uiType: InputUiType.ARRAY,
			type: InputDataType.ARRAY,
			in: InputRequestLocation.BODY,
			required: true,
		},
		{
			name: 'values',
			displayName: 'Values',
			description: 'These are the cell values that will be appended to your sheet',
			uiType: InputUiType.LONG_TEXT,
			type: InputDataType.STRING,
			in: InputRequestLocation.BODY,
			required: false,
		},
		{
			name: 'spreadSheetId',
			displayName: 'Spread Sheet Id',
			description: 'The id of your spread sheet: https://docs.google.com/spreadsheets/d/{spreadSheetId}',
			uiType: InputUiType.SHORT_TEXT,
			type: InputDataType.STRING,
			in: InputRequestLocation.BODY,
			required: false,
		},
		{
			name: 'asString',
			displayName: 'As String',
			description: 'Inserted values that are dates and formulas will be strings and have no affect',
			uiType: InputUiType.CHECKBOX,
			type: InputDataType.BOOLEAN,
			in: InputRequestLocation.BODY,
			required: false,
		},
	],
	async runner(configValue) {
		console.log(configValue.inputs.values);
		await appendGoogleSheetValues({
			accessToken: configValue.authentication.accessToken,
			majorDimension: Dimension.COLUMNS,
			range: configValue.inputs.range,
			spreadSheetId: configValue.inputs.spreadSheetId,
			valueInputOption: configValue.inputs.asString
				? ValueInputOption.RAW
				: ValueInputOption.USER_ENTERED,
			values: JSON.parse(configValue.inputs.values) as string[],
		});
		return {
			success: true,
		};
	},
});
