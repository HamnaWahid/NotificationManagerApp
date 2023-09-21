import React, { useState } from 'react';
import ToolbarHeader from '../../common/Toolbar/ToolBar';
import EventToolbarHeader from '../../common/Toolbar/EventToolBar';
import NotificationToolbarHeader from '../../common/Toolbar/NotificationToolBar';
import Events from './Events';
import Dashboard from './Dashboard';
import Notifications from './Notifications';
import { useBetween } from 'use-between';
import { Alert } from '@mui/material';
export const IndexState = () => {
  const [clickedAppName, setClickedAppName] = useState<string>('');
  const [clickedEventName, setClickedEventName] = useState<string>('');
  const [clickedAppId, setClickedAppId] = useState<string | number>('');
  const [clickedEventId, setClickedEventId] = useState<string | number>('');
  const [showNotifications, setShowNotifications] = useState<boolean>(false); // Track whether to show notificatio
  const [clickedNotificationId, setClickedNotificationId] = useState<
    string | number
  >('');

  return {
    clickedAppName,
    setClickedAppName,
    clickedEventName,
    setClickedEventName,
    clickedAppId,
    setClickedAppId,
    clickedEventId,
    setClickedEventId,
    showNotifications,
    setShowNotifications,
    clickedNotificationId,
    setClickedNotificationId,
  };
};

const Index: React.FC = () => {
  const [showAppAlert, setShowAppAlert] = useState(false);
  const [showEventAlert, setShowEventAlert] = useState(false);

  const {
    clickedAppName,
    setClickedAppName,
    clickedEventName,
    setClickedEventName,
    clickedAppId,
    setClickedAppId,
    clickedEventId,
    setClickedEventId,
    showNotifications,
    setShowNotifications,
    clickedNotificationId,
    setClickedNotificationId,
  } = useBetween(IndexState);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('appName'); // Initialize with default sort option
  const [sortOrder, setSortOrder] = useState<string>('asc'); // Initialize with default sort order
  const [isActive, setIsActive] = useState<null | boolean>(null); // Initialize isActive with null
  const [isActive2, setIsActive2] = useState<null | boolean>(null); // Initialize isActive with null
  const [isActive3, setIsActive3] = useState<null | boolean>(null); // Initialize isActive with null
  const [page, setPage] = useState<number>(1);

  const handleAppTileClick = (appId: string | number, appName: string) => {
    setClickedAppId(appId);
    setClickedAppName(appName);
    setClickedEventId(''); // Reset clickedEventId when a new app is clicked
    setClickedEventName(''); // Reset clickedEventName when a new app is clicked
    setShowNotifications(false); // Hide notifications when a new app is clicked
    setShowAppAlert(false);
  };

  const handleEventTileClick = (
    eventId: string | number,
    eventName: string
  ) => {
    setClickedEventId(eventId);
    setClickedEventName(eventName);
    setShowNotifications(true); // Show notifications when an event is clicked
  };

  const handleNotificationTileClick = (notificationId: string | number) => {
    setClickedNotificationId(notificationId);
    setShowAppAlert(false);
  };

  return (
    <div>
      <ToolbarHeader
        title='Application'
        page={page}
        setPage={setPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        sortOrder={sortOrder} // Pass sortOrder to ToolbarHeader
        setSortBy={setSortBy} // Pass setSortBy to ToolbarHeader
        setSortOrder={setSortOrder} // Pass setSortOrder to ToolbarHeader
        isActive={isActive} // Pass isActive
        setIsActive={setIsActive} // Pass setIsActive
      />
      <Dashboard
        page={page}
        setPage={setPage}
        searchTerm={searchTerm}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSet={handleAppTileClick}
        isActive={isActive} // Pass isActive
        setIsActive={setIsActive} // Pass setIsActive
      />

      {/* Conditionally render Event components */}
      {clickedAppId ? (
        <>
          <EventToolbarHeader
            page={page}
            setPage={setPage}
            title='Events'
            clickedAppName={clickedAppName}
            clickedAppId={clickedAppId}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            sortOrder={sortOrder} // Pass sortOrder to ToolbarHeader
            setSortBy={setSortBy} // Pass setSortBy to ToolbarHeader
            setSortOrder={setSortOrder} // Pass setSortOrder to ToolbarHeader
            isActive={isActive2} // Pass isActive
            setIsActive={setIsActive2} // Pass setIsActive
          />
          <Events
            page={page}
            setPage={setPage}
            searchTerm={searchTerm}
            clickedAppId={clickedAppId}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onEventTileClick={handleEventTileClick}
            isActive={isActive2} // Pass isActive
            setIsActive={setIsActive2} // Pass setIsActive
          />
        </>
      ) : (
        <div style={{ marginTop: '2px' }}>
          <Alert severity='warning'>
            Please select an Application to view events.
          </Alert>
        </div>
      )}

      {/* Conditionally render Notification components */}
      {showNotifications && clickedEventId ? (
        <>
          <NotificationToolbarHeader
            page={page}
            setPage={setPage}
            title='Notifications'
            clickedEventId={clickedEventId}
            clickedEventName={clickedEventName}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            sortOrder={sortOrder} // Pass sortOrder to ToolbarHeader
            setSortBy={setSortBy} // Pass setSortBy to ToolbarHeader
            setSortOrder={setSortOrder} // Pass setSortOrder to ToolbarHeader
            isActive={isActive3} // Pass isActive
            setIsActive={setIsActive3} // Pass setIsActive
          />
          <Notifications
            page={page}
            setPage={setPage}
            searchTerm={searchTerm}
            clickedEventId={clickedEventId}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onNotificationTileClick={handleNotificationTileClick}
            isActive={isActive3} // Pass isActive
            setIsActive={setIsActive3} // Pass setIsActive
          />
        </>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <Alert severity='warning'>
            Please select an Event to view notifications.
          </Alert>
        </div>
      )}
    </div>
  );
};

export default Index;
