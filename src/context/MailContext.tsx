import React, { createContext, useState, useContext } from 'react';

const MailContext = createContext({
  unreadCount: 0,
  setUnreadCount: (_: number) => {},
});

export const MailProvider = ({ children }: { children: React.ReactNode }) => {
  const [unreadCount, setUnreadCount] = useState(5); // Initial unread messages

  return (
    <MailContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </MailContext.Provider>
  );
};

export const useMail = () => useContext(MailContext);
