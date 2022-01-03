import React from "react";
import PropTypes from "prop-types";

export default function MoviePageForm({ onSubmit, onChange, value }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        value={value}
        type="text"
        placeholder="Search films"
        onChange={onChange}
      />
      <button type="submit">
        <span>Search</span>
      </button>
    </form>
  );
}

MoviePageForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
