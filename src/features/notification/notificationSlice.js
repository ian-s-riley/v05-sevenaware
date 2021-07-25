import { createSlice } from '@reduxjs/toolkit';

//AWS Amplify GraphQL libraries
import { API } from 'aws-amplify';
import { createNotification as createNotificationMutation } from '../../graphql/mutations';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    sendEmail: false,
    sendSMS: false,
    fromUserId: "",
    toUserId: "",
    fromEmail: "",
    toEmail: "",
    fromName: "",
    toName: "",
    action: "",
    status: "",
    badgeColor: "",
    badgeIcon: "",
    title: "",
    body: "",
    htmlBody: "",
    emailBody: "",
    smsBody: "",
    footerTitle: "",
    footer: "",   
    oneTimeLink: "",
    oneTimeLinkUseDate: null,
    businessName: "",
    percentOwner: 0,
  },
});

export const createNotificationAsync = notification => dispatch => {
    //console.log('createNotificationAsync: notification', notification)
    API.graphql({ 
        query: createNotificationMutation, 
        variables: { 
          input: {
            sendEmail: notification.sendEmail,
            sendSMS: notification.sendSMS,
            fromUserId: notification.fromUserId,
            toUserId: notification.toUserId,
            fromEmail: notification.fromEmail,
            toEmail: notification.toEmail,
            fromName: notification.fromName,
            toName: notification.toName,
            action: notification.action,
            status: notification.status,
            badgeColor: notification.badgeColor,
            badgeIcon: notification.badgeIcon,
            title: notification.title,
            body: notification.body,
            htmlBody: notification.htmlBody,
            emailBody: notification.emailBody,
            smsBody: notification.smsBody,
            footerTitle: notification.footerTitle,
            footer: notification.footer,   
            oneTimeLink: notification.oneTimeLink,   
            oneTimeLinkUseDate: notification.oneTimeLinkUseDate,   
            businessName: notification.businessName,   
            percentOwner: notification.percentOwner,   
          }
        } 
    })
    .then (data => {
        //console.log(data)      
        //console.log('createNotificationAsync: data', data)  
    }) 
  };

export default notificationSlice.reducer;