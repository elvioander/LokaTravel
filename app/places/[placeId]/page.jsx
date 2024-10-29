"use client";

import React from "react";

import { useState, useEffect } from "react";

const DetailsPage = ({ params }) => {
  const placeId = params.placeId;
  return <div>{placeId}</div>;
};

export default DetailsPage;
