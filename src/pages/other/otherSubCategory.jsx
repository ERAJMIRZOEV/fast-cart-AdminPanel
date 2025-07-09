import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fade
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getCategories } from '../../api/categoryApi/categoryApi';
import { useDispatch, useSelector } from 'react-redux';
import { addSubCategory, deleteSubCategory, getSubCategory } from '../../api/subCategoryApi/getSubCategory';
import { Link } from 'react-router-dom';
import { toast, Toaster } from "sonner";

const OtherSubCategory = () => {
  const [activeTab, setActiveTab] = useState(2);
  const [subCategoryName, setSubCategoryName] = useState('');
  const [idx, setIdx] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [editIdx, setEditIdx] = useState('');
  const [editName, setEditName] = useState('');
  const [editId, setEditId] = useState('');

  const dispatch = useDispatch();
  const { categoryData } = useSelector((state) => state.categories) || {};
  const { subCategoryData } = useSelector((state) => state.subcategory) || {};

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategory());
  }, [dispatch]);

  const handleTabChange = (_, newValue) => setActiveTab(newValue);

  const addSubCategories = () => {
    if (!subCategoryName.trim() || !idx) {
      toast.error("All fields are required");
      return;
    }
    dispatch(addSubCategory({ subCategoryName, idx }));
    toast.success("Subcategory created");
    setSubCategoryName('');
    setIdx('');
  };

  const handleEditOpen = (sub) => {
    setEditIdx(sub.categoryId || '');
    setEditName(sub.subCategoryName || '');
    setEditId(sub.id);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditIdx('');
    setEditName('');
    setEditId('');
  };

  const handleSaveEdit = () => {
    if (!editName.trim() || !editIdx) {
      toast.error("All fields are required");
      return;
    }
    dispatch(addSubCategory({ subCategoryName: editName, idx: editIdx, id: editId, isEdit: true }));
    toast.success("Subcategory updated");
    handleEditClose();
  };

  return (
    <Fade in timeout={500}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box mb={4}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 600,
                color: '#555',
                '&:hover': { color: '#1976d2' },
              },
              '& .Mui-selected': {
                color: '#2196f3',
              },
            }}
          >
            <Link to={'/other'}><Tab label="Categories" /></Link>
            <Link to={'/brands'}><Tab label="Brands" /></Link>
            <Tab label="Subcategories" />
          </Tabs>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Fade in timeout={600}>
              <Paper sx={{ overflow: 'hidden' }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#fafafa' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                          Subcategories
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {subCategoryData.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={2}>
                            <Typography align="center" color="textSecondary">
                              No subcategories available.
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        subCategoryData.map((sub, index) => (
                          <Fade in timeout={index * 80 + 300} key={sub.id}>
                            <TableRow
                              hover
                              sx={{
                                transition: 'all 0.3s ease',
                                '&:hover': { backgroundColor: '#f5f5f5' },
                              }}
                            >
                              <TableCell>{sub.subCategoryName}</TableCell>
                              <TableCell>
                                <Box display="flex" gap={1}>
                                  <IconButton
                                    size="small"
                                    sx={{ color: '#2196f3' }}
                                    onClick={() => handleEditOpen(sub)}
                                  >
                                    <Edit fontSize="small" />
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    sx={{ color: '#f44336' }}
                                    onClick={() => dispatch(deleteSubCategory(sub.id))}
                                  >
                                    <Delete fontSize="small" />
                                  </IconButton>
                                </Box>
                              </TableCell>
                            </TableRow>
                          </Fade>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Fade>
          </Grid>

          <Grid item xs={12} md={6}>
            <Fade in timeout={700}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" mb={3}>
                  Add new subcategory
                </Typography>
                <Box>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel shrink id="parent-category-label">
                      Parent category
                    </InputLabel>
                    <Select
                      notched
                      labelId="parent-category-label"
                      value={idx}
                      label="Parent category"
                      onChange={(e) => setIdx(e.target.value)}
                    >
                      {categoryData.length === 0 ? (
                        <MenuItem disabled>Loading...</MenuItem>
                      ) : (
                        categoryData.map((el) => (
                          <MenuItem key={el.id} value={el.id}>
                            {el.categoryName}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Subcategory name"
                    value={subCategoryName}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                    sx={{ mb: 3 }}
                  />
                  <Button
                    variant="contained"
                    disabled={!subCategoryName || !idx}
                    sx={{
                      backgroundColor: '#2196f3',
                      textTransform: 'none',
                      px: 4,
                      '&:hover': { backgroundColor: '#1976d2' },
                    }}
                    onClick={addSubCategories}
                  >
                    Create
                  </Button>
                </Box>
              </Paper>
            </Fade>
          </Grid>
        </Grid>

        <Fade in={editOpen} timeout={300}>
          <Dialog open={editOpen} onClose={handleEditClose}>
            <DialogTitle>Edit Subcategory</DialogTitle>
            <DialogContent>
              <Box mt={1} minWidth={300}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel shrink id="edit-category-label">Category</InputLabel>
                  <Select
                    notched
                    labelId="edit-category-label"
                    value={editIdx}
                    label="Parent category"
                    onChange={(e) => setEditIdx(e.target.value)}
                  >
                    {categoryData.map((el) => (
                      <MenuItem key={el.id} value={el.id}>
                        {el.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Subcategory name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  sx={{ mb: 2 }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose}>Cancel</Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#2196f3' }}
                onClick={handleSaveEdit}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Fade>

        <Toaster richColors position="bottom-right" />
      </Container>
    </Fade>
  );
};

export default OtherSubCategory;
