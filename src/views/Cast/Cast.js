import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";

export default function Cast() {
  const { url } = useRouteMatch();
  const { movieId } = useParams();

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}
