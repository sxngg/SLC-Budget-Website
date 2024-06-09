export const fetchPage = async (url: string, token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error(`Get request failed: ${response.status} ${response.text}`);
  }

  const data = await response.json();
  return data;
};