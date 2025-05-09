import React from 'react';
import { Card } from 'flowbite-react';

const BackgroundPreview = ({ imageUrl, isBlurred = false, overlayOpacity = 0.5, children }) => {
  const backgroundStyle = {
    backgroundImage: `url(${imageUrl || 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: isBlurred ? 'blur(4px)' : 'none',
    height: '100%',
    width: '100%',
    position: 'relative',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
    zIndex: 1,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 2,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    padding: '1rem',
  };

  return (
    <Card className="w-full h-full overflow-hidden border-0 rounded-lg">
      <div style={backgroundStyle}>
        <div style={overlayStyle}></div>
        <div style={contentStyle}>
          {children}
        </div>
      </div>
    </Card>
  );
};

export default BackgroundPreview;
