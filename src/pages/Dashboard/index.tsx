import React, { useState } from "react";
import ToolbarHeader from "../../common/Toolbar/ToolBar";
import EventToolbarHeader from "../../common/Toolbar/EventToolBar";
import NotificationToolbarHeader from "../../common/Toolbar/NotificationToolBar";
import Events from "./Events";
import Dashboard from "./Dashboard";
import Notifications from "./Notifications";

const Index: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [clickedAppId, setClickedAppId] = useState<string | number>("");
  const [clickedAppName, setClickedAppName] = useState<string>("");
  const [clickedEventId, setClickedEventId] = useState<string | number>("");
  const [clickedEventName, setClickedEventName] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("appName"); // Initialize with default sort option
  const [sortOrder, setSortOrder] = useState<string>("asc"); // Initialize with default sort order

  const [clickedNotificationId, setClickedNotificationId] = useState<
    string | number
  >("");

  const handleAppTileClick = (appId: string | number, appName: string) => {
    setClickedAppId(appId);
    setClickedAppName(appName);
    console.log("Clicked App ID:", appId);
    console.log("Clicked App Name:", appName);
  };

  const handleEventTileClick = (
    eventId: string | number,
    eventName: string
  ) => {
    setClickedEventId(eventId);
    setClickedEventName(eventName);
    console.log("Clicked Event ID:", eventId);
    console.log("Clicked Event Name:", eventName);
  };

  const handleNotificationTileClick = (notificationId: string | number) => {
    setClickedNotificationId(notificationId);
    console.log("Clicked Notification ID:", notificationId);
  };

  return (
    <div>
      <ToolbarHeader
        title="Application"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        sortOrder={sortOrder} // Pass sortOrder to ToolbarHeader
        setSortBy={setSortBy} // Pass setSortBy to ToolbarHeader
        setSortOrder={setSortOrder} // Pass setSortOrder to ToolbarHeader
      />
      <Dashboard
        searchTerm={searchTerm}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSet={handleAppTileClick}
      />

      {/* Conditionally render Event components */}
      {clickedAppId ? (
        <>
          <EventToolbarHeader
            title="Events"
            clickedAppName={clickedAppName}
            clickedAppId={clickedAppId}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <Events
            searchTerm={searchTerm}
            clickedAppId={clickedAppId}
            onEventTileClick={handleEventTileClick}
          />
        </>
      ) : (
        <div>
          <p>Alert: Please select an App.</p>
        </div>
      )}

      {/* Conditionally render Notification components */}
      {clickedEventId ? (
        <>
          <NotificationToolbarHeader
            title="Notifications"
            clickedEventId={clickedEventId}
            clickedEventName={clickedEventName}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <Notifications
            searchTerm={searchTerm}
            clickedEventId={clickedEventId}
            onNotificationTileClick={handleNotificationTileClick}
          />
        </>
      ) : (
        <div>
          <p>Alert: Please select an Event.</p>
        </div>
      )}
    </div>
  );
};

export default Index;
