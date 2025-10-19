import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils";
import { reportFetchStart, reportFetchSuccess, reportFetchFailure } from "../redux/slices/reportSlice";

import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography,
    Box,
    CircularProgress
} from '@mui/material';
import ReportTable from '../components/ReportTable';
import PdfModal from '../components/PdfModal';
import { Link } from "react-router-dom";

function Report() {
    const dispatch = useDispatch();
    const { reports, reportLoading, reportError } = useSelector((state) => state.report);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                dispatch(reportFetchStart());
                const res = await axios.get(`${BASE_URL}/reports/getReports`, { withCredentials: true });
                dispatch(reportFetchSuccess(res.data.data));
            } catch (err) {
                console.error(err);
                dispatch(reportFetchFailure(err.response?.data?.message || "Failed to load reports"));
            }
        };

        fetchReports(); // 👈 async function call
    }, [dispatch]);

    return (
        <Box sx={{ mt: 4, borderRadius: 2, padding: '20px', position: "relative", height: '100%' }}>
            <Typography variant="h5" sx={{ m: 1 }}>
                All Reports
            </Typography>
            <Table>
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
                        reports.map((report) => (
                            <ReportTable {...report} key={report._id} />
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                No reports found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <PdfModal />
        </Box>
    );
}
export default Report;