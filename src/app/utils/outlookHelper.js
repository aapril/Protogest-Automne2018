import uuidv1 from 'uuid/v1'
import { environment } from '../../environments/environment';
const CLIENT_ID = '5d37e0ba-cfa1-4a0a-b45c-a22ddfabd011';
const REDIRECT_URI = `${environment.backendUrl}/authorize`
const OUTLOOK_API_BASE_URL = 'https://login.microsoftonline.com';
const OUTLOOK_AUTH_PATH = 'common/oauth2/v2.0/authorize';
const SCOPE = [
    'openid',
    'offline_access',
    'profile',
    'User.Read',
    'Mail.Read',
    'Calendars.Read',
    'Contacts.Read'
];
const RESPONSE_TYPE = [
    'code',
    'id_token'
]

export const generateOutlookAuthUrl = () => {
    let state = uuidv1();
    let nonce = uuidv1();
    let params = [
        `client_id=${CLIENT_ID}`,
        `redirect_uri=${REDIRECT_URI}`,
        `response_type=${RESPONSE_TYPE.join('%20')}`,
        `scope=${SCOPE.join('%20')}`,
        `state=${state}`,
        `nonce=${nonce}`,
        'response_mode=form_post'
    ];

    return `${OUTLOOK_API_BASE_URL}/${OUTLOOK_AUTH_PATH}?${params.join('&')}`
};
