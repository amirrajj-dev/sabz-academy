import React from "react";
import CampaigansForm from "./CampaiganForm";

const CampaigansPage = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto bg-base-200">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-0 justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-base-content">
          🎈 برگزاری کمپین جدید
        </h1>
      </div>

      <CampaigansForm/>
    </div>
  );
};

export default CampaigansPage;
