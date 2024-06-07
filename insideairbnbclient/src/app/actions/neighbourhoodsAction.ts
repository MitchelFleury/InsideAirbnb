const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllNeighbourhoods = async (token: string) => {
  const response = await fetch(`${baseUrl}/neighbourhoods`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}