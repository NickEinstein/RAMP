import React from "react";

function ViewAll({ milestones }) {
  return (
    <div>
      <h2>View All Milestones</h2>
      {milestones?.length === 0 ? (
        <p>No milestones available.</p>
      ) : (
        <ul>
          {milestones?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewAll;
