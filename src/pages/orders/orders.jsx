import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Chip,
  Pagination,
  InputAdornment,
  IconButton,
  Container
} from '@mui/material';
import {
  Search,
  Add,
  Edit,
  Delete,
  FilterList
} from '@mui/icons-material';

const Orders = () => {
  const [selectedOrders, setSelectedOrders] = useState(['#12512B', '#12523C', '#51232A', '#23534D']);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('Newest');

  // Sample orders data
  const orders = [
    { id: '#12512B', date: 'May 5, 4:20 PM', customer: 'Tom Anderson', paymentStatus: 'Paid', orderStatus: 'Ready', total: '$49.90' },
    { id: '#12523C', date: 'May 5, 4:15 PM', customer: 'Jayden Walker', paymentStatus: 'Paid', orderStatus: 'Ready', total: '$34.36' },
    { id: '#51232A', date: 'May 5, 4:15 PM', customer: 'Inez Kim', paymentStatus: 'Paid', orderStatus: 'Ready', total: '$5.51' },
    { id: '#23534D', date: 'May 5, 4:12 PM', customer: 'Francisco Henry', paymentStatus: 'Paid', orderStatus: 'Shipped', total: '$29.74' },
    { id: '#51323C', date: 'May 5, 4:12 PM', customer: 'Violet Phillips', paymentStatus: 'Paid', orderStatus: 'Shipped', total: '$23.06' },
    { id: '#35622A', date: 'May 5, 4:12 PM', customer: 'Rosetta Becker', paymentStatus: 'Paid', orderStatus: 'Shipped', total: '$87.44' },
    { id: '#44232D', date: 'May 5, 4:10 PM', customer: 'Dean Love', paymentStatus: 'Paid', orderStatus: 'Ready', total: '$44.55' },
    { id: '#56212D', date: 'May 5, 4:08 PM', customer: 'Nettie Tyler', paymentStatus: 'Paid', orderStatus: 'Ready', total: '$36.79' },
    { id: '#23534D', date: 'May 5, 4:04 PM', customer: 'Miguel Harris', paymentStatus: 'Pending', orderStatus: 'Ready', total: '$50.54' },
    { id: '#12523C', date: 'May 5, 4:04 PM', customer: 'Angel Conner', paymentStatus: 'Pending', orderStatus: 'Ready', total: '$63.47' },
    { id: '#51232A', date: 'May 5, 4:03 PM', customer: 'Rosalie Singleton', paymentStatus: 'Pending', orderStatus: 'Received', total: '$91.63' }
  ];

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const getPaymentStatusColor = (status) => {
    return status === 'Paid' ? 'success' : 'warning';
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'Ready':
        return 'warning';
      case 'Shipped':
        return 'info';
      case 'Received':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getOrderStatusStyle = (status) => {
    switch (status) {
      case 'Ready':
        return { backgroundColor: '#fff3e0', color: '#f57c00' };
      case 'Shipped':
        return { backgroundColor: '#e3f2fd', color: '#1976d2' };
      case 'Received':
        return { backgroundColor: '#e8eaf6', color: '#3f51b5' };
      default:
        return {};
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Orders
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            backgroundColor: '#2196f3',
            '&:hover': {
              backgroundColor: '#1976d2'
            }
          }}
        >
          Add order
        </Button>
      </Box>

      {/* Search and Filter Bar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <TextField
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#666' }} />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
          size="small"
        />
        
        <Box display="flex" alignItems="center" gap={2}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              Filter
            </Typography>
            <Select
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              <MenuItem value="Newest">Newest</MenuItem>
              <MenuItem value="Oldest">Oldest</MenuItem>
              <MenuItem value="Highest">Highest Amount</MenuItem>
              <MenuItem value="Lowest">Lowest Amount</MenuItem>
            </Select>
          </FormControl>
          
          <Box display="flex" gap={1}>
            <IconButton size="small" sx={{ color: '#2196f3' }}>
              <Edit />
            </IconButton>
            <IconButton size="small" sx={{ color: '#666' }}>
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Orders Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#fafafa' }}>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>Order</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>Payment status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>Order Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={index} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                      sx={{
                        color: '#2196f3',
                        '&.Mui-checked': {
                          color: '#2196f3',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {order.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {order.date}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {order.customer}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={order.paymentStatus}
                      size="small"
                      sx={{
                        backgroundColor: order.paymentStatus === 'Paid' ? '#e8f5e8' : '#fff3e0',
                        color: order.paymentStatus === 'Paid' ? '#2e7d32' : '#f57c00',
                        fontWeight: 'medium',
                        fontSize: '12px'
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={order.orderStatus}
                      size="small"
                      sx={{
                        ...getOrderStatusStyle(order.orderStatus),
                        fontWeight: 'medium',
                        fontSize: '12px'
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {order.total}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Pagination */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
        <Pagination 
          count={6} 
          page={1} 
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              '&.Mui-selected': {
                backgroundColor: '#2196f3',
                color: 'white',
              },
            },
          }}
        />
        <Typography variant="body2" color="text.secondary">
          274 Results
        </Typography>
      </Box>
    </Container>
  );
};

export default Orders;