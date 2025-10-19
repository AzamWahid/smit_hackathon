import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { closePdfModal } from "../redux/slices/reportSlice";

const PdfModal = () => {
  const dispatch = useDispatch();
  const { pdfModalOpen, selectedPdf } = useSelector((state) => state.report);

  return (
    <Modal open={pdfModalOpen} onClose={() => dispatch(closePdfModal())}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "90%",
          bgcolor: "background.paper",
          borderRadius: "10px",
          boxShadow: 24,
          p: 2,
          overflow: "hidden",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Report PDF</Typography>
          <IconButton onClick={() => dispatch(closePdfModal())}>
            <CloseIcon />
          </IconButton>
        </Box>

        {selectedPdf ? (
          <iframe
            src={selectedPdf}
            width="100%"
            height="90%"
            style={{ border: "none", marginTop: "10px" }}
            title="Report PDF"
          ></iframe>
        ) : (
          <Typography variant="body1" textAlign="center" mt={5}>
            No PDF selected.
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default PdfModal;