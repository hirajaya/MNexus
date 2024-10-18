import React from 'react';
import { useParams } from 'react-router-dom';
import SideNavbar from './SideNavBar';

const ArtistLayout = ({ children }) => {
  const { AID } = useParams();

  return (
    <div className="flex">
      <SideNavbar AID={AID} />
      <div className="flex-grow p-4">{children}</div>
    </div>
  );
};

export default ArtistLayout;
