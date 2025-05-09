import React from 'react';
import { Timeline, Button, Badge } from 'flowbite-react';
import { HiCalendar, HiTrash, HiThumbUp, HiOutlineFilm, HiOutlineTv } from 'react-icons/hi';

const ViewingHistoryTimeline = ({ historyItems, onRemoveItem, onUseForRecommendations }) => {
  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Get content type icon
  const getContentTypeIcon = (type) => {
    return type === 'movie' ? <HiOutlineFilm className="h-5 w-5" /> : <HiOutlineTv className="h-5 w-5" />;
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Viewing History</h2>
      
      {historyItems && historyItems.length > 0 ? (
        <Timeline>
          {historyItems.map((item) => (
            <Timeline.Item key={item.id}>
              <Timeline.Point icon={HiCalendar} />
              <Timeline.Content>
                <Timeline.Time>{formatDate(item.watchedDate)}</Timeline.Time>
                <Timeline.Title className="flex items-center gap-2">
                  {item.title}
                  <Badge color={item.type === 'movie' ? 'blue' : 'purple'} className="ml-2">
                    <div className="flex items-center gap-1">
                      {getContentTypeIcon(item.type)}
                      <span>{item.type}</span>
                    </div>
                  </Badge>
                </Timeline.Title>
                <Timeline.Body>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.duration} • {item.progress}% watched
                  </p>
                  <div className="mt-3 flex space-x-2">
                    <Button 
                      size="xs" 
                      color="failure" 
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <HiTrash className="mr-1 h-4 w-4" />
                      Remove
                    </Button>
                    <Button 
                      size="xs" 
                      color="success" 
                      onClick={() => onUseForRecommendations(item.id)}
                    >
                      <HiThumbUp className="mr-1 h-4 w-4" />
                      Use for Recommendations
                    </Button>
                  </div>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-500 dark:text-gray-400">No viewing history available</p>
        </div>
      )}
    </div>
  );
};

export default ViewingHistoryTimeline;