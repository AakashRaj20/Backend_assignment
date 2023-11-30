const express = require("express");

const secureEndpoint = async (req, res) => {
  try {
    return res
      .status(200)
      .json({
        message:
          "You have access to this endpoint. This Api route is protected and rate limited",
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { secureEndpoint };
