import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Box, Grid, Paper, Typography, TextField } from "@mui/material";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState("");

  const addBlog = () => {
    if (!newBlog.trim()) return;
    setBlogs([...blogs, newBlog]);
    setNewBlog("");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome {user ? user.firstName : "Guest"} 👋
      </Typography>

      {user ? (
        <>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Add a new box"
              value={newBlog}
              onChange={(e) => setNewBlog(e.target.value)}
              sx={{ mr: 2 }}
            />
            <Button variant="contained" onClick={addBlog}>
              Add Box
            </Button>
          </Box>

          <Grid container spacing={2}>
            {blogs.map((blog, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Paper sx={{ p: 2 }}>
                  <Typography>{blog}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography variant="body1" color="textSecondary">
          Please login to add boxes.
        </Typography>
      )}
    </Box>
  );
};

export default Home;
