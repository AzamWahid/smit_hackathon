import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, ToastAlert } from "../utils";
import { reportFetchStart, reportFetchSuccess, reportFetchFailure } from "../redux/slices/reportSlice";

import {
  Box, Typography, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableHead, TableRow, CircularProgress
} from "@mui/material";

import ReportTable from "../components/ReportTable";
import PdfModal from "../components/PdfModal";

function HomeDashboard() {
  const dispatch = useDispatch();
  const { reports } = useSelector((state) => state.report);

  const [vitals, setVitals] = useState([]);
  const [vitalsLoading, setVitalsLoading] = useState(false);
  const [reportsLoading, setReportsLoading] = useState(false);

  // Fetch Vitals
  useEffect(() => {
    const fetchVitals = async () => {
      try {
        setVitalsLoading(true);
        const res = await axios.get(`${BASE_URL}/vitals/getAll`, { withCredentials: true });
        setVitals(res.data.data);
        setVitalsLoading(false);
      } catch (err) {
        console.error(err);
        setVitalsLoading(false);
        ToastAlert({ type: "error", message: err.response?.data?.message || "Failed to load vitals" });
      }
    };

    fetchVitals();
  }, []);

  // Fetch Reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setReportsLoading(true);
        dispatch(reportFetchStart());
        const res = await axios.get(`${BASE_URL}/reports/getReports`, { withCredentials: true });
        dispatch(reportFetchSuccess(res.data.data));
        setReportsLoading(false);
      } catch (err) {
        console.error(err);
        dispatch(reportFetchFailure(err.response?.data?.message || "Failed to load reports"));
        setReportsLoading(false);
      }
    };

    fetchReports();
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>
        Dashboard
      </Typography>

      {/* Vitals Section */}
      <Typography variant="h5" mb={2}>
        Your Latest Vitals
      </Typography>
      {vitalsLoading ? (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} mb={4}>
          {vitals.length > 0 ? vitals.map((vital) => (
            <Grid item xs={12} sm={6} md={4} key={vital._id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3, backgroundColor: "#e3f2fd" }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    {new Date(vital.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">BP: {vital.bp || "N/A"}</Typography>
                  <Typography variant="h6" fontWeight="bold">Sugar: {vital.sugar || "N/A"}</Typography>
                  <Typography variant="h6" fontWeight="bold">Weight: {vital.weight ? `${vital.weight} kg` : "N/A"}</Typography>
                  {vital.notes && <Typography variant="body2" mt={1}>Notes: {vital.notes}</Typography>}
                </CardContent>
              </Card>
            </Grid>
          )) : (
            <Typography variant="body1" color="text.secondary" sx={{ ml: 2 }}>
              No vitals recorded yet.
            </Typography>
          )}
        </Grid>
      )}

      {/* Reports Section */}
      <Typography variant="h5" mb={2}>
        Your Reports
      </Typography>
      {reportsLoading ? (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Table sx={{ mb: 4 }}>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Report Name</strong></TableCell>
              <TableCell><strong>Doctor</strong></TableCell>
              <TableCell><strong>Hospital</strong></TableCell>
              <TableCell><strong>Uploaded On</strong></TableCell>
              <TableCell><strong>PDF File</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports && reports.length > 0 ? (
              reports.map((report) => <ReportTable {...report} key={report._id} />)
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">No reports found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <PdfModal />
    </Box>
  );
}

export default HomeDashboard;
