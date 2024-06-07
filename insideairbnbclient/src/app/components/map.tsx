'use client';
import React, { useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { getListingCoordinates, getListingDetails } from '../actions/listingsAction';
import { ListingCoordinate } from '../interfaces/listingCoordinate';
import { ListingDetail } from '../interfaces/listingDetail';

interface MapProps {
  selectedNeighbourhood: string;
  minPrice: number;
  maxPrice: number;
  filteredListingCoordinates: ListingCoordinate[];
  token: string;
}

function Map({ selectedNeighbourhood, minPrice, maxPrice, filteredListingCoordinates, token }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_KEY as string;
    if (!mapContainer.current) return;

    const initializeMap = async () => {
      const map = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [2.349014, 48.864716],
        zoom: 10,
      });

      map.on('load', async () => {
        const data: ListingCoordinate[]  = await getListingCoordinates(token);

        const listings: any = {
          type: 'FeatureCollection',
          features: [],
        };

        data.forEach((listing) => {
          if (
            listing.latitude === null ||
            listing.latitude === undefined ||
            listing.longitude === null ||
            listing.longitude === undefined ||
            listing.id === null ||
            listing.id === undefined
          ) {
            return;
          }

          const pointFeature = {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [listing.longitude, listing.latitude],
            },
            properties: {
              id: listing.id
            },
          };

          listings.features.push(pointFeature);
        });

        const neighbourhoods = require('../../data/neighbourhoods.geojson');
        map.addSource('neighbourhoods', {
          type: 'geojson',
          data: neighbourhoods,
        });

        map.addSource('listings', {
          type: 'geojson',
          data: listings,
        });

        map.addLayer({
          id: 'neighbourhoods',
          type: 'fill',
          source: "neighbourhoods",
          paint: {
            'fill-color': '#0000FF',
            "fill-opacity": 0.3,
          },
        });

        map.addLayer({
          id: 'listings',
          type: 'circle',
          source: 'listings',
          paint: {
            'circle-radius': 4,
            'circle-color': '#FF0000',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#FFFFFF',
          },
        });

        map.on('click', 'listings', (e) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            getListingDetails(token, feature.properties?.id)
              .then((data: ListingDetail) => {
                const tempAnnualPrice = data.numberOfBookedNights * data.price;
                const annualPrice = tempAnnualPrice.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                const monthlyPrice = (tempAnnualPrice / 12).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                new mapboxgl.Popup()
                  .setLngLat(e.lngLat)
                  .setHTML(`
                    <strong>${data.name}</strong> by <strong>${data.hostName}</strong> <br>
                    ${data.neighbourhood} <br><hr>
                    ${data.numberOfBookedNights} nights last year (${data.numOfReviews ? data.numOfReviews : 0} reviews)<br>
                    €${monthlyPrice} (€${annualPrice} last yr) <br>
                    @${data.price}/night, ${data.minimumNights} nights min <br>
                  `)
                  .addTo(map);
              });
          }
        });

        map.on('mouseenter', 'listings', () => {
          map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'listings', () => {
          map.getCanvas().style.cursor = '';
        });

        mapRef.current = map;
      });
    };

    initializeMap();

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    applyNeighbourhoodFilter();
  }, [filteredListingCoordinates]);

  const applyNeighbourhoodFilter = () => {
    if (selectedNeighbourhood === "Paris") {
      mapRef.current?.setFilter('neighbourhoods', null);
    } else {
      mapRef.current?.setFilter('neighbourhoods', ["==", "neighbourhood", selectedNeighbourhood]);
    }
    updateListingsSource(filteredListingCoordinates)
  };

  const updateListingsSource = (data: ListingCoordinate[]) => {
    const listings: any = {
      type: 'FeatureCollection',
      features: [],
    };

    data.forEach((listing) => {
      if (
        listing.latitude === null ||
        listing.latitude === undefined ||
        listing.longitude === null ||
        listing.longitude === undefined ||
        listing.id === null ||
        listing.id === undefined
      ) {
        return;
      }

      const pointFeature = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [listing.longitude, listing.latitude],
        },
        properties: {
          id: listing.id
        },
      };

      listings.features.push(pointFeature);
    });

    (mapRef.current?.getSource('listings') as mapboxgl.GeoJSONSource)?.setData(listings);
  }
  return (
    <div ref={mapContainer} className="w-full h-full" />
  );
}

export default Map;
