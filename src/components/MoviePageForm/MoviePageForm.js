import React from "react";
import PropTypes from "prop-types";
// import { Formik, Field, Form } from "formik";
import { useFormik } from "formik";

import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function MoviePageForm({ onSubmit }) {
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: onSubmit,
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          name="search"
          value={formik.values.search}
          onChange={formik.handleChange}
          type="text"
          id="outlined-basic"
          label="Search films"
          variant="outlined"
        />

        <IconButton type="submit" sx={{ p: "10px" }}>
          <SearchIcon />
        </IconButton>
      </form>
    </>
  );
}

MoviePageForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
