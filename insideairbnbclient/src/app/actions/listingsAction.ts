const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getListingCoordinates = async (token: string) => {
  const response = await fetch(`${baseUrl}/listings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export const getFilteredListingCoordinates = async (
  token: string,
  neighbourhood: string,
  minPrice: number,
  maxPrice: number,
  numOfReviews: number
) => {
  const response = await fetch(`
    ${baseUrl}/listings/filteredListing?neighbourhood=${neighbourhood}&minPrice=${minPrice}&maxPrice=${maxPrice}&numOfReviews=${numOfReviews}
  `, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export const getListingDetails = async (token: string, id: number) => {
  const response = await fetch(`${baseUrl}/listings/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}
