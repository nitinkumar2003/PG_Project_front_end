import React from 'react';

const Loader = () => {
  return (
    <div style={{zIndex:'999999'}} className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-white opacity-75 z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
};

export default Loader;
