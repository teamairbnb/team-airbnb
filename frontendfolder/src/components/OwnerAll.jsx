import React from "react";
import OwnerUnread from "./OwnerUnread";
import OwnerRead from "./OwnerRead";

export default function OwnerAll() {
  return (
    <div className="text-[#111827]">
      <OwnerUnread />
      <div className="mt-3">
        <OwnerRead />
      </div>

      {/* <div className="text-start mt-6">
        <p className="opacity-55 text-sm mb-6">Older</p>

        <OwnerUnread />
        <div className="mt-3">
          <OwnerRead />
        </div>
      </div> */}
    </div>
  );
}
