import React, { useRef, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    TextField,
    CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, ToastAlert } from "../utils";
import { reportFetchFailure, reportFetchStart, reportFetchSuccess } from "../redux/slices/reportSlice";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
// import { createReport } from "../redux/actions/reportActions"; // 👈 apni actions file ka path sahi rakhna

function UploadReport() {
    const navigate = useNavigate();
    const form = useRef({});
    const dispatch = useDispatch();
    const { reportLoading } = useSelector((state) => state.report);
    const [pdfPreview, setPdfPreview] = useState(null);

    // handle file select
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== "application/pdf") {
            ToastAlert("error", "Please upload a valid PDF file.");
            return;
        }

        form.current.file = file; // 👈 ensure it's stored as 'file'
        const fileURL = URL.createObjectURL(file);
        setPdfPreview(fileURL);
    };


    // handle text input
    const handleChange = (e) => {
        form.current = { ...form.current, [e.target.name]: e.target.value };
    };

    // submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (let key in form.current) {
            formData.append(key, form.current[key]);
        }

        try {
            dispatch(reportFetchStart());

            const res = await axios.post(`${BASE_URL}/reports/upload`, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Upload response:", res.data);

            dispatch(reportFetchSuccess(res.data.data));
            ToastAlert({ type: "success", message: "Report uploaded successfully!" });
            navigate('/reports')


            // 👇 keep the uploaded PDF visible
            if (res.data?.data?.pdfUrl) {
                setPdfPreview(res.data.data.pdfUrl);
            }

            // 👇 optional: clear form fields but not preview
            form.current.reportName = "";
            form.current.doctorName = "";
            form.current.file = null;
        } catch (err) {
            console.error(err);
            dispatch(reportFetchFailure(err.response?.data?.message || "Upload failed"));
            ToastAlert({
                type: "error",
                message: err.response?.data?.message || "Something went wrong",
            });
        }
    };


    return (
        <Box sx={{ margin: "20px" }}>
            <Typography variant="h4">Upload Report</Typography>

            <Card sx={{ width: "100%", mt: 2, boxShadow: 3, borderRadius: 3 }}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        {/* Report Name */}
                        <TextField
                            fullWidth
                            label="Report Name"
                            name="reportName"
                            variant="outlined"
                            margin="normal"
                            onChange={handleChange}
                            required
                        />

                        {/* Doctor Name */}
                        <TextField
                            fullWidth
                            label="Doctor Name"
                            name="doctorName"
                            variant="outlined"
                            margin="normal"
                            onChange={handleChange}
                            required
                        />

                        {/* File Upload */}
                        <Box mt={2}>
                            <Typography fontWeight={500}>Report PDF</Typography>
                            <Button
                                variant="contained"
                                component="label"
                                sx={{ mt: 1, backgroundColor: "#0ba127ff" }}
                            >
                                Choose File
                                <input
                                    hidden
                                    type="file"
                                    name="file"
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                />
                            </Button>
                            {form.current.reportPdf && (
                                <Typography
                                    variant="body2"
                                    sx={{ mt: 1, color: "gray", wordBreak: "break-all" }}
                                >
                                    {form.current.reportPdf.name}
                                </Typography>
                            )}
                        </Box>

                        {/* PDF Preview */}
                        {pdfPreview && (
                            <Box mt={3}>
                                <Typography fontWeight={500}>PDF Preview</Typography>
                                <iframe
                                    src={pdfPreview}
                                    title="PDF Preview"
                                    width="100%"
                                    height="400px"
                                    allow="fullscreen"
                                    style={{
                                        border: "1px solid #ccc",
                                        borderRadius: "8px",
                                        marginTop: "10px",
                                    }}
                                ></iframe>
                            </Box>
                        )}

                        {/* Submit Button */}
                        <Box textAlign="center" mt={4}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                disabled={reportLoading}
                                sx={{ px: 4, py: 1 }}
                            >
                                {reportLoading ? (
                                    <>
                                        <CircularProgress
                                            size={20}
                                            color="inherit"
                                            sx={{ mr: 1 }}
                                        />
                                        Uploading...
                                    </>
                                ) : (
                                    "Upload Report"
                                )}
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}

export default UploadReport;
