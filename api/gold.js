export default async function handler(req, res) {
  try {
    const apiKey = process.env.TWELVE_DATA_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "API key not configured"
      });
    }

    const interval = req.query?.interval || "1min";

    const url =
      "https://api.twelvedata.com/time_series" +
      "?symbol=XAU/USD" +
      "&interval=" + encodeURIComponent(interval) +
      "&outputsize=100" +
      "&apikey=" + encodeURIComponent(apiKey);

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
