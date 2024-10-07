import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendDigestEmail = async (to: string, subject: string, content: string) => {
  const msg = {
    to,
    from: 'digest@newsletterdigest.com', // Use your verified sender
    subject,
    text: content,
    html: `<div>${content}</div>`,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};