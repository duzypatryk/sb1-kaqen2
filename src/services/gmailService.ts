import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

export const getGmailService = async () => {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  // In a real application, you would get the token from your backend
  // which securely stores the refresh token and handles token refresh
  const tokens = { /* get tokens from your secure storage */ };
  auth.setCredentials(tokens);

  return google.gmail({ version: 'v1', auth });
};

export const fetchNewsletters = async (gmail: any) => {
  const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000).getTime() / 1000;
  const query = `category:primary after:${threeHoursAgo}`;

  const response = await gmail.users.messages.list({
    userId: 'me',
    q: query,
  });

  const messages = response.data.messages || [];
  const newsletters = await Promise.all(
    messages.map(async (message: any) => {
      const fullMessage = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
      });

      // Extract relevant information from the email
      const subject = fullMessage.data.payload.headers.find(
        (header: any) => header.name.toLowerCase() === 'subject'
      )?.value;

      const body = fullMessage.data.payload.parts.find(
        (part: any) => part.mimeType === 'text/plain'
      )?.body.data;

      const decodedBody = Buffer.from(body, 'base64').toString('utf-8');

      return {
        id: message.id,
        subject,
        body: decodedBody,
      };
    })
  );

  return newsletters;
};