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
// import { notify } from "../../utils/HelperFunctions";
import { BASE_URL, ToastAlert } from '../utils';
// import { createReport } from "../../redux/actions/reportActions";

function ReportForm() {
  const form = useRef({});
  const dispatch = useDispatch();
  const { reportLoading } = useSelector((state) => state.report);
  const [pdfPreview, setPdfPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    form.current = { ...form.current, [e.target.name]: file };

    if (file && file.type === "application/pdf") {
      const fileURL = URL.createObjectURL(file);
      setPdfPreview(fileURL);
    } else {
      setPdfPreview(null);
      ToastAlert("error", "Please upload a valid PDF file.");
    }
  };

  const handleChange = (e) => {
    form.current = { ...form.current, [e.target.name]: e.target.value };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in form.current) {
      formData.append(key, form.current[key]);
    }

    dispatch(createReport(formData))
      .then((msg) => ToastAlert("success", msg))
      .catch((err) => ToastAlert("error", err));
  };

  return (
      <Card sx={{ width: "100%", mt:2, boxShadow: 3, borderRadius: 3 }}>
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
                  name="reportPdf"
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

  );
}

export default ReportForm;