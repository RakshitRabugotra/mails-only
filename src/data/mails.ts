export type Mail = {
  id: string
  sender: string
  subject: string
  preview: string
  timestamp: string
  body: string
  unread: true
}

const mails = [
  {
    id: "1",
    sender: "Alice Johnson",
    subject: "Welcome to our service!",
    preview: "Hi there, thanks for signing up...",
    timestamp: "2025-05-20T10:00:00Z",
    body: "Hi there,\n\nThanks for signing up for our email service. We hope you enjoy the experience.\n\nBest,\nTeam",
    unread: true,
  },
  {
    id: "2",
    sender: "Bob Smith",
    subject: "Your invoice is ready",
    preview: "Please find attached the invoice for...",
    timestamp: "2025-05-21T12:00:00Z",
    body: "Dear customer,\n\nAttached is your invoice for May 2025.\n\nThanks,\nAccounts",
    unread: false,
  },
  {
    id: "3",
    sender: "Charlie Daniels",
    subject: "Meeting Reminder",
    preview: "Just a reminder that we have a meeting...",
    timestamp: "2025-05-22T09:30:00Z",
    body: "Hi team,\n\nJust a reminder that we have a meeting scheduled tomorrow at 10 AM.\n\nCheers,\nCharlie",
    unread: true,
  },
  {
    id: "4",
    sender: "Dana Lee",
    subject: "Weekly Newsletter",
    preview: "Here’s your roundup of the week...",
    timestamp: "2025-05-23T15:45:00Z",
    body: "Hello subscriber,\n\nHere’s your roundup of the week’s top stories and insights.\n\nWarm regards,\nNewsletter Team",
    unread: false,
  },
  {
    id: "5",
    sender: "Evan Stone",
    subject: "Event Invitation",
    preview: "You’re invited to our annual...",
    timestamp: "2025-05-24T08:00:00Z",
    body: "Hello,\n\nYou’re invited to our annual appreciation gala this Friday evening. RSVP by Thursday.\n\nRegards,\nEvents Team",
    unread: true,
  },
  {
    id: "6",
    sender: "Fiona Green",
    subject: "Password Reset",
    preview: "You requested a password reset...",
    timestamp: "2025-05-24T07:15:00Z",
    body: "Hi,\n\nYou requested a password reset. Click the link below to set a new password.\n\nThanks,\nSupport Team",
    unread: false,
  },
  {
    id: "7",
    sender: "George Brown",
    subject: "Product Update",
    preview: "We’ve made some exciting changes...",
    timestamp: "2025-05-24T11:22:00Z",
    body: "Hi there,\n\nWe’ve made some exciting updates to our product. Check out what’s new in the latest release!\n\nCheers,\nThe Product Team",
    unread: true,
  },
  {
    id: "8",
    sender: "Helen White",
    subject: "Subscription Renewal",
    preview: "Your subscription will renew soon...",
    timestamp: "2025-05-23T18:30:00Z",
    body: "Hello,\n\nYour subscription will automatically renew on May 30th. No action is required.\n\nThank you,\nSubscriptions Team",
    unread: false,
  },
  {
    id: "9",
    sender: "Ian Black",
    subject: "Feedback Request",
    preview: "We’d love to hear your thoughts...",
    timestamp: "2025-05-22T14:00:00Z",
    body: "Hi,\n\nWe’d love to hear your thoughts on your recent experience. Please take a minute to complete our survey.\n\nBest,\nCustomer Service",
    unread: true,
  },
  {
    id: "10",
    sender: "Jessica Blue",
    subject: "Job Opportunity",
    preview: "We found a role that matches your skills...",
    timestamp: "2025-05-21T16:00:00Z",
    body: "Hi,\n\nWe found a role that matches your skills and experience. Click to learn more and apply today!\n\nBest,\nRecruiting Team",
    unread: false,
  },
] as Mail[]

export default mails
