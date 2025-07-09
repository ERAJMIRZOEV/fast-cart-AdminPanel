import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Tab,
  Tabs,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Container,
  Pagination,
  Modal,
  Fade,
  Grow,
  Zoom
} from '@mui/material';
import {
  Search,
  Add,
  Edit,
  Delete,
  CloudUpload,
  Close
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories
} from '../../api/categoryApi/categoryApi';
import { toast, Toaster } from "sonner";
import { Link } from 'react-router-dom';

const Other = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [modalCategoryName, setModalCategoryName] = useState('');
  const [modalCategoryImage, setModalCategoryImage] = useState(null);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCategoryImage, setEditCategoryImage] = useState(null);
  const [editCategoryImagePreview, setEditCategoryImagePreview] = useState('');
  const [idx, setIdx] = useState(null);

  const dispatch = useDispatch();
  const { categoryData } = useSelector((state) => state.categories) || {};

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  const handleSave = () => {
    const newCategory = new FormData();
    newCategory.append("categoryName", modalCategoryName);
    newCategory.append("categoryImage", modalCategoryImage);
    dispatch(addCategory(newCategory));
    setOpenModal(false);
    setModalCategoryName("");
    setModalCategoryImage(null);
  };

  const editCategoryInfo = (el) => {
    setEditCategoryId(el.id);
    setEditCategoryName(el.categoryName);
    setEditCategoryImage(null);
    setEditCategoryImagePreview(`http://37.27.29.18:8002/images/${el.categoryImage}`);
    setOpenEditModal(true);
    setIdx(el.id);
  };

  const editCategorySend = () => {
    const editedCategory = new FormData();
    editedCategory.append("id", idx);
    editedCategory.append("categoryName", editCategoryName);
    editedCategory.append("categoryImage", editCategoryImage);
    dispatch(editCategory(editedCategory));
    setOpenEditModal(false);
  };

  const filteredData = categoryData?.filter(el =>
    el.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const CategoryCard = ({ el }) => (
    <Grow in={true} timeout={800}>
      <Card
        sx={{
          height: 160,
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-6px)'
          }
        }}
      >
        <IconButton
          sx={{ 
            position: 'absolute', 
            top: 8, 
            right: 40, 
            color: '#ff5252',
            backgroundColor: 'rgba(255, 82, 82, 0.1)',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 82, 82, 0.2)'
            }
          }}
          size="small"
          onClick={() => dispatch(deleteCategory(el.id))}
        >
          <Delete fontSize="small" />
        </IconButton>
        <IconButton
          sx={{ 
            position: 'absolute', 
            top: 8, 
            right: 8, 
            color: '#2196f3',
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(33, 150, 243, 0.2)'
            }
          }}
          size="small"
          onClick={() => editCategoryInfo(el)}
        >
          <Edit fontSize="small" />
        </IconButton>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            textAlign: 'center',
            padding: '16px !important'
          }}
        >
          <Box sx={{ 
            mb: 2,
            width: 60,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            backgroundColor: 'rgba(33, 150, 243, 0.05)',
            overflow: 'hidden'
          }}>
            <img
              src={`http://37.27.29.18:8002/images/${el.categoryImage}`}
              alt={el.categoryName}
              style={{ 
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain'
              }}
            />
          </Box>
          <Typography fontWeight={600} color="#2c3e50">{el.categoryName}</Typography>
        </CardContent>
      </Card>
    </Grow>
  );

  return (
    <Fade in={true} timeout={500}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTabs-indicator': {
                height: 4,
                borderRadius: '4px 4px 0 0'
              }
            }}
          >
            <Tab 
              label="Categories" 
              sx={{ 
                fontWeight: 600,
                fontSize: '0.95rem',
                textTransform: 'none',
                minHeight: 48,
                color: activeTab === 0 ? '#2196f3' : '#5a6b82',
                '&.Mui-selected': {
                  color: '#2196f3'
                }
              }} 
            />
            <Link to="/brands" style={{ textDecoration: 'none' }}>
              <Tab 
                label="Brands" 
                sx={{ 
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  minHeight: 48,
                  color: '#5a6b82',
                  '&:hover': {
                    color: '#2196f3'
                  }
                }} 
              />
            </Link>
            <Link to="/subcategories" style={{ textDecoration: 'none' }}>
              <Tab 
                label="Subcategories" 
                sx={{ 
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  minHeight: 48,
                  color: '#5a6b82',
                  '&:hover': {
                    color: '#2196f3'
                  }
                }} 
              />
            </Link>
          </Tabs>

          <Zoom in={true} timeout={600}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenModal(true)}
              sx={{
                textTransform: 'none',
                fontWeight: '600',
                borderRadius: '12px',
                px: 3,
                py: 1,
                fontSize: '0.95rem',
                backgroundColor: '#2196f3',
                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#1976d2',
                  boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Add new
            </Button>
          </Zoom>
        </Box>

        <TextField
          placeholder="Search category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
          size="small"
          sx={{
            mb: 4,
            width: 300,
            backgroundColor: 'rgba(240, 244, 248, 0.6)',
            borderRadius: '12px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.08)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(33, 150, 243, 0.4)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#2196f3',
                boxShadow: '0 0 0 3px rgba(33, 150, 243, 0.1)'
              },
            }
          }}
        />

        <Grid container spacing={3} mb={4}>
          {filteredData.map((el) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={el.id}>
              <CategoryCard el={el} />
            </Grid>
          ))}
        </Grid>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Pagination 
            count={6} 
            page={2} 
            color="primary" 
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': {
                fontWeight: 600,
                color: '#5a6b82'
              },
              '& .Mui-selected': {
                backgroundColor: 'rgba(33, 150, 243, 0.1) !important',
                color: '#2196f3 !important'
              }
            }}
          />
          <Typography variant="body2" color="text.secondary" fontWeight={500}>274 Results</Typography>
        </Box>

        {/* Add Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Fade in={openModal}>
            <Box
              sx={{
                bgcolor: 'white',
                p: 4,
                borderRadius: '16px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
                maxWidth: 500,
                width: '90%',
                mx: 'auto',
                mt: '5%',
                outline: 'none',
                position: 'relative'
              }}
            >
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  color: '#5a6b82',
                  '&:hover': {
                    color: '#2196f3'
                  }
                }}
                onClick={() => setOpenModal(false)}
              >
                <Close />
              </IconButton>
              
              <Typography variant="h5" fontWeight="bold" mb={3} color="#2c3e50">
                Add New Category
              </Typography>

              <TextField
                label="Category name"
                fullWidth
                value={modalCategoryName}
                onChange={(e) => setModalCategoryName(e.target.value)}
                sx={{ mb: 3 }}
                InputLabelProps={{
                  sx: { 
                    color: '#7a8ba6',
                    fontWeight: '500',
                    '&.Mui-focused': {
                      color: '#2196f3'
                    }
                  }
                }}
              />

              <Box
                sx={{
                  border: '2px dashed rgba(0, 0, 0, 0.12)',
                  p: 4,
                  textAlign: 'center',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  mb: 3,
                  '&:hover': { 
                    borderColor: '#2196f3',
                    backgroundColor: 'rgba(33, 150, 243, 0.03)'
                  }
                }}
              >
                <input
                  type="file"
                  hidden
                  id="category-upload"
                  onChange={e => setModalCategoryImage(e.target.files[0])}
                />
                <label htmlFor="category-upload" style={{ cursor: 'pointer' }}>
                  <CloudUpload sx={{ 
                    fontSize: 48, 
                    color: '#7a8ba6',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#2196f3',
                      transform: 'scale(1.1)'
                    }
                  }} />
                  <Typography variant="body2" mt={1} color="#7a8ba6">
                    Drag & drop or click to upload
                  </Typography>
                </label>
                {modalCategoryImage && (
                  <Typography 
                    variant="caption" 
                    mt={1}
                    sx={{
                      display: 'inline-block',
                      backgroundColor: 'rgba(33, 150, 243, 0.1)',
                      color: '#2196f3',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '12px',
                      fontWeight: 500
                    }}
                  >
                    {modalCategoryImage.name}
                  </Typography>
                )}
              </Box>

              <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
                <Button 
                  onClick={() => setOpenModal(false)}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    color: '#5a6b82',
                    px: 3,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  onClick={handleSave}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3,
                    backgroundColor: '#2196f3',
                    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                    '&:hover': {
                      backgroundColor: '#1976d2',
                      boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)'
                    }
                  }}
                >
                  Create Category
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>

        {/* Edit Modal */}
        <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
          <Fade in={openEditModal}>
            <Box
              sx={{
                bgcolor: 'white',
                p: 4,
                borderRadius: '16px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
                maxWidth: 500,
                width: '90%',
                mx: 'auto',
                mt: '5%',
                outline: 'none',
                position: 'relative'
              }}
            >
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  color: '#5a6b82',
                  '&:hover': {
                    color: '#2196f3'
                  }
                }}
                onClick={() => setOpenEditModal(false)}
              >
                <Close />
              </IconButton>
              
              <Typography variant="h5" fontWeight="bold" mb={3} color="#2c3e50">
                Edit Category
              </Typography>

              <TextField
                label="Category name"
                fullWidth
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
                sx={{ mb: 3 }}
                InputLabelProps={{
                  sx: { 
                    color: '#7a8ba6',
                    fontWeight: '500',
                    '&.Mui-focused': {
                      color: '#2196f3'
                    }
                  }
                }}
              />

              <Box
                sx={{
                  border: '2px dashed rgba(0, 0, 0, 0.12)',
                  p: 4,
                  textAlign: 'center',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  mb: 3,
                  '&:hover': { 
                    borderColor: '#2196f3',
                    backgroundColor: 'rgba(33, 150, 243, 0.03)'
                  }
                }}
              >
                <input
                  type="file"
                  hidden
                  id="edit-category-upload"
                  onChange={e => {
                    setEditCategoryImage(e.target.files[0]);
                    setEditCategoryImagePreview(URL.createObjectURL(e.target.files[0]));
                  }}
                />
                <label htmlFor="edit-category-upload" style={{ cursor: 'pointer' }}>
                  <CloudUpload sx={{ 
                    fontSize: 48, 
                    color: '#7a8ba6',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#2196f3',
                      transform: 'scale(1.1)'
                    }
                  }} />
                  <Typography variant="body2" mt={1} color="#7a8ba6">
                    Drag & drop or click to upload
                  </Typography>
                </label>
                {editCategoryImagePreview && (
                  <Box mt={2}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        mb: 1
                      }}
                    >
                      <img 
                        src={editCategoryImagePreview} 
                        alt="Preview" 
                        style={{ 
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }} 
                      />
                    </Box>
                    {editCategoryImage && (
                      <Typography 
                        variant="caption" 
                        sx={{
                          display: 'inline-block',
                          backgroundColor: 'rgba(33, 150, 243, 0.1)',
                          color: '#2196f3',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '12px',
                          fontWeight: 500
                        }}
                      >
                        {editCategoryImage.name}
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>

              <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
                <Button 
                  onClick={() => setOpenEditModal(false)}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    color: '#5a6b82',
                    px: 3,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  onClick={editCategorySend}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3,
                    backgroundColor: '#2196f3',
                    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                    '&:hover': {
                      backgroundColor: '#1976d2',
                      boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)'
                    }
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>

        <Toaster richColors position="bottom-right" />
      </Container>
    </Fade>
  );
};

export default Other;