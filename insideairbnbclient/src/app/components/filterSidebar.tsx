import React from 'react';
import { Neighbourhood } from "../interfaces/neighbourhood";

interface FilterSidebarProps {
  selectedNeighbourhood: string;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  neighbourhoods: Neighbourhood[];
  minPrice: number;
  maxPrice: number;
  setMinPrice: (minPrice: number) => void;
  setMaxPrice: (maxPrice: number) => void;
  handleFilterClick: () => void;
  numOfReviews: number;
  setNumOfReviews: (sliderValue: number) => void;
}

function FilterSidebar({
  selectedNeighbourhood,
  handleSelectChange,
  neighbourhoods,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  handleFilterClick,
  numOfReviews,
  setNumOfReviews
}: FilterSidebarProps) {
  return (
    <div className="w-full h-full p-4">
      {/* Neighbourhood dropdown */}
      <h2 className="text-xl font-bold mb-4">Filter</h2>
      <label htmlFor="max-price" className="block text-sm font-medium text-gray-700">Neighbourhood</label>
      <select
        value={selectedNeighbourhood}
        onChange={handleSelectChange}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option key="Paris" value="Paris">Paris</option>
        {neighbourhoods.map((neighbourhood) => (
          <option key={neighbourhood.neighbourhood} value={neighbourhood.neighbourhood}>
            {neighbourhood.neighbourhood}
          </option>
        ))}
      </select>

      {/* Price filter */}
      <div className="flex space-x-2 mt-4">
        <div className="flex-1">
          <label htmlFor="min-price" className="block text-sm font-medium text-gray-700">Min price</label>
          <input
            type="number"
            id="min-price"
            name="min-price"
            value={minPrice}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMinPrice(event.target.valueAsNumber)}
            className="w-full p-2 border border-gray-300 rounded"
            max={10}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="max-price" className="block text-sm font-medium text-gray-700">Max price</label>
          <input
            type="number"
            id="max-price"
            name="max-price"
            value={maxPrice}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMaxPrice(event.target.valueAsNumber)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Slider */}
      <div className="mt-4">
        <label htmlFor="slider" className="block text-sm font-medium text-gray-700">Aantal reviews</label>
        <input
          type="range"
          id="slider"
          name="slider"
          min={0}
          max={200}
          step={10}
          value={numOfReviews}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNumOfReviews(event.target.valueAsNumber)}
          className="w-full"
        />
        <div className="text-center">{numOfReviews}+</div>
      </div>

      {/* Filter button */}
      <button
        onClick={handleFilterClick}
        className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 mt-6"
      >
        Filter
      </button>
    </div>
  );
}

export default FilterSidebar;
