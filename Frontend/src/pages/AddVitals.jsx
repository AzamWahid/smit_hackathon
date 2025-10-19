import React, { useState, useEffect } from "react";
import { Box, Button, Card, CardContent, TextField, Typography, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL, ToastAlert } from "../utils";
import { reportFetchStart, reportFetchSuccess, reportFetchFailure } from "../redux/slices/reportSlice"; // reuse same slice for simplicity

function AddVitals() {
  const dispatch = useDispatch();
  const { reportLoading } = useSelector((state) => state.report);

  const [vitals, setVitals] = useState({
    bp: "",
    sugar: "",
    weight: "",
    notes: "",
    date: "",
  });

  const handleChange = (e) => {
    setVitals({ ...vitals, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(reportFetchStart());
      const res = await axios.post(`${BASE_URL}/vitals/add`, vitals, { withCredentials: true });
      dispatch(reportFetchSuccess(res.data.data));
      ToastAlert({ type: "success", message: "Vitals added successfully!" });
      setVitals({ bp: "", sugar: "", weight: "", notes: "", date: "" });
    } catch (err) {
      console.error(err);
      dispatch(reportFetchFailure(err.response?.data?.message || "Failed to add vitals"));
      ToastAlert({ type: "error", message: err.response?.data?.message || "Something went wrong" });
    }
  };

  return (
    <Box sx={{ mt: 4, padding: 2 }}>
      <Typography variant="h5" mb={2}>Add Manual Vitals</Typography>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField label="Blood Pressure" name="bp" value={vitals.bp} onChange={handleChange} fullWidth margin="normal" placeholder="120/80" />
            <TextField label="Sugar" name="sugar" type="number" value={vitals.sugar} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Weight (kg)" name="weight" type="number" value={vitals.weight} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Notes" name="notes" value={vitals.notes} onChange={handleChange} fullWidth margin="normal" multiline rows={2} />
            <TextField label="Date" name="date" type="date" value={vitals.date} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />

            <Box textAlign="center" mt={3}>
              <Button type="submit" variant="contained" color="success" disabled={reportLoading}>
                {reportLoading ? <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} /> : "Add Vitals"}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AddVitals;
