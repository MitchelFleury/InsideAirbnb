'use client';
import React, { useEffect, useState } from 'react';
import Map from './components/map';
import { getAllNeighbourhoods } from './actions/neighbourhoodsAction';
import { getFilteredListingCoordinates } from './actions/listingsAction';
import { Neighbourhood } from './interfaces/neighbourhood';
import { ListingCoordinate } from './interfaces/listingCoordinate';
import Header from './components/header';
import { useAuth0 } from '@auth0/auth0-react';
import parseJwt from './utils/parseJWT';
import { getStats } from './actions/statsAction';
import FilterSidebar from './components/filterSidebar';
import StatsSidebar from './components/statsSidebar';
import Login from './components/login';

function MapPage() {
  const [neighbourhoods, setNeighbourhoods] = useState<Neighbourhood[]>([]);
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState<string>('Paris');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [filteredListingCoordinates, setFilteredListingCoordinates] = useState<ListingCoordinate[]>([]);
  const [numOfReviews, setNumOfReviews] = useState<number>(0);
  const [statsData, setStatsData] = useState<any>(null);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [hasStatsPermission, setHasStatsPermission] = useState<boolean>(false);
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {    
    getStatistics();
  }, []);

  const getStatistics = async () => {
    try {
      const token = await getAccessTokenSilently();
      setToken(token);
      setLoading(false);
      const parsedToken = parseJwt(token);

      getAllNeighbourhoods(token)
      .then((data) => {
        setNeighbourhoods(data);
      });
  
      if(parsedToken.permissions.includes("read:statistics")) {
        setHasStatsPermission(true);
        getStats(token)
          .then(data => {
            setStatsData(data);
          });
      }
    } catch (e: any) {
      console.log(e.message);
      setLoading(false);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedNeighbourhood(event.target.value);
  };

  const handleFilterClick = async () => {
    const data = await getFilteredListingCoordinates(token, selectedNeighbourhood, minPrice, maxPrice, numOfReviews);
    setFilteredListingCoordinates(data);
  };

  const toggleSidebar = () => {
    setShowStats(prevState => !prevState);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      {token && !loading ? (
        <div className="flex flex-col lg:flex-row-reverse flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 h-full p-4 bg-gray-100 flex flex-col overflow-y-auto">
            {hasStatsPermission && (
              <button 
                onClick={toggleSidebar}
                className="py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 mt-6 mx-4"
                style={{ width: 'calc(100% - 2rem)' }}
              >
                {showStats ? 'Show Filters' : 'Show Stats'}
              </button>
            )}
            <div className="flex-1 overflow-y-auto">
              {showStats ? (
                <StatsSidebar statsData={statsData} />
              ) : (
                <FilterSidebar
                  selectedNeighbourhood={selectedNeighbourhood}
                  handleSelectChange={handleSelectChange}
                  neighbourhoods={neighbourhoods}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  setMinPrice={setMinPrice}
                  setMaxPrice={setMaxPrice}
                  handleFilterClick={handleFilterClick}
                  numOfReviews={numOfReviews}
                  setNumOfReviews={setNumOfReviews}
                />
              )}
            </div>
          </div>

          {/* Map */}
          <div className="w-full lg:w-3/4 h-full">
            <Map
              selectedNeighbourhood={selectedNeighbourhood}
              minPrice={minPrice}
              maxPrice={maxPrice}
              filteredListingCoordinates={filteredListingCoordinates}
              token={token}
            />
          </div>
        </div>
      ) : ( 
        <Login loading={loading} />
      )}
    </div>
  );
}

export default MapPage;
