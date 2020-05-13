import React from 'react';

import TopPanel from '../components/TopPanel';

const TopPanelContainer: React.FC = () => {
  const mockProps = {
    requestStatus: {
      accepted: 'Accepted',
      ongoing: 'Ongoing',
      finished: 'Finished',
      completed: 'Completed',
      cancel: 'Cancel',
      closed: 'Closed',
    },
    user: {
      name: 'Daniel Wade',
      rating: 4.5,
      distance: '3 km',
    },
  };

  return <TopPanel request={mockProps.requestStatus} user={mockProps.user} />;
};

export default TopPanelContainer;
