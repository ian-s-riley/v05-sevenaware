/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      userId
      formId
      userType
      email
      password
      preifx
      firstName
      middleName
      lastName
      suffix
      addressId
      title
      profile
      image
      tin
      ssn
      idType
      percentOwner
      sevenAwareAgree
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        formId
        userType
        email
        password
        preifx
        firstName
        middleName
        lastName
        suffix
        addressId
        title
        profile
        image
        tin
        ssn
        idType
        percentOwner
        sevenAwareAgree
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getForm = /* GraphQL */ `
  query GetForm($id: ID!) {
    getForm(id: $id) {
      id
      userId
      authorizedSignatoryUserId
      formId
      sopVersion
      loanAmount
      screenId
      screenNavigation
      percentComplete
      ineligible
      forProfit
      us
      businessEmail
      entityType
      fein
      noFein
      ssn
      tin
      tinExpiration
      jointTaxes
      jointFirst
      jointFirstSsn
      jointFirstTin
      businessTin
      businessTinType
      businessName
      dba
      usesDba
      businessImage
      businessAddressId
      nacis
      agreeLexisNexis
      fullOwner
      createdAt
      updatedAt
    }
  }
`;
export const listForms = /* GraphQL */ `
  query ListForms(
    $filter: ModelFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listForms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        authorizedSignatoryUserId
        formId
        sopVersion
        loanAmount
        screenId
        screenNavigation
        percentComplete
        ineligible
        forProfit
        us
        businessEmail
        entityType
        fein
        noFein
        ssn
        tin
        tinExpiration
        jointTaxes
        jointFirst
        jointFirstSsn
        jointFirstTin
        businessTin
        businessTinType
        businessName
        dba
        usesDba
        businessImage
        businessAddressId
        nacis
        agreeLexisNexis
        fullOwner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAddress = /* GraphQL */ `
  query GetAddress($id: ID!) {
    getAddress(id: $id) {
      id
      userId
      addressType
      address1
      address2
      city
      state
      zip
      zipPlus4
      county
      country
      createdAt
      updatedAt
    }
  }
`;
export const listAddresses = /* GraphQL */ `
  query ListAddresses(
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAddresses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        addressType
        address1
        address2
        city
        state
        zip
        zipPlus4
        county
        country
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      id
      sendEmail
      sendSMS
      private
      fromUserId
      toUserId
      fromEmail
      toEmail
      fromName
      toName
      action
      status
      badgeColor
      badgeIcon
      title
      body
      htmlBody
      emailBody
      smsBody
      footerTitle
      footer
      oneTimeLink
      oneTimeLinkUseDate
      businessName
      percentOwner
      createdAt
      updatedAt
    }
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sendEmail
        sendSMS
        private
        fromUserId
        toUserId
        fromEmail
        toEmail
        fromName
        toName
        action
        status
        badgeColor
        badgeIcon
        title
        body
        htmlBody
        emailBody
        smsBody
        footerTitle
        footer
        oneTimeLink
        oneTimeLinkUseDate
        businessName
        percentOwner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
