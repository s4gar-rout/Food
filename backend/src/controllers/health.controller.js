export const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Food Delivery API is running",
    timestamp: new Date().toISOString(),
  });
};