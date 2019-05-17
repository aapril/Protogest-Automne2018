import uuidv1 from 'uuid/v1'
import { environment } from '../../environments/environment';
const CLIENT_ID = '5d37e0ba-cfa1-4a0a-b45c-a22ddfabd011';
const REDIRECT_URI = `${environment.backendUrl}/authorize`
const OUTLOOK_API_BASE_URL = 'https://login.microsoftonline.com';
const OUTLOOK_AUTH_PATH = 'common/oauth2/v2.0/authorize';

generateOutlookAuthUrl = () => {
    let state = uuidv1();
    let nonce = uuidv1();
    let params = [
        `client_id=${CLIENT_ID}`,
        `redirect_uri=${REDIRECT_URI}`,
        'response_type=code%20id_token',
        `scope=openid%20offline_access%20profile%20User.Read%20Mail.Read%20Calendars.Read%20Contacts.Read`,
        `state=${state}`,
        `nonce=${nonce}`,
        'response_mode=form_post'
    ];

    return `${OUTLOOK_API_BASE_URL}/${OUTLOOK_AUTH_PATH}?${params.join('&')}`
};

module.exports = {
    generateOutlookAuthUrl
}