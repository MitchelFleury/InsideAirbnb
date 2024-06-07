const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getStats = async (token: string) => {
  const response = await fetch(`${baseUrl}/Listings/Stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}