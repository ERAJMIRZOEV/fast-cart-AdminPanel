import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Link,
  Container,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  AttachMoney,
  ShoppingCart,
} from "@mui/icons-material";

const Dashboard = () => {
  
  const salesData = [
    { month: "Jan", value: 10 },
    { month: "Feb", value: 15 },
    { month: "Mar", value: 12 },
    { month: "Apr", value: 18 },
    { month: "May", value: 35 },
    { month: "Jun", value: 28 },
    { month: "Jul", value: 32 },
    { month: "Aug", value: 45 },
    { month: "Sep", value: 38 },
    { month: "Oct", value: 25 },
    { month: "Nov", value: 28 },
    { month: "Dec", value: 32 },
  ];

  
  const transactions = [
    {
      name: "Jagarnath S.",
      date: "24.05.2023",
      amount: "$124.97",
      status: "Paid",
    },
    {
      name: "Anand G.",
      date: "23.05.2023",
      amount: "$55.42",
      status: "Pending",
    },
    { name: "Kartik S.", date: "23.05.2023", amount: "$89.90", status: "Paid" },
    {
      name: "Rakesh S.",
      date: "22.05.2023",
      amount: "$144.94",
      status: "Pending",
    },
    { name: "Anup S.", date: "22.05.2023", amount: "$70.52", status: "Paid" },
    { name: "Jimmy P.", date: "22.05.2023", amount: "$70.52", status: "Paid" },
  ];

  
  const topProducts = [
    { name: "Men Grey Hoodie", price: "$49.90", units: 204 },
    { name: "Women Striped T-Shirt", price: "$34.90", units: 155 },
    { name: "Wome White T-Shirt", price: "$40.90", units: 120 },
    { name: "Men White T-Shirt", price: "$49.90", units: 204 },
    { name: "Women Red T-Shirt", price: "$34.90", units: 155 },
  ];

  
  const topSellingProducts = [
    {
      name: "Healthcare Erbology",
      category: "in Accessories",
      sales: "13,153",
      salesText: "in sales",
    },
    {
      name: "Healthcare Erbology",
      category: "in Accessories",
      sales: "13,153",
      salesText: "in sales",
    },
    {
      name: "Healthcare Erbology",
      category: "in Accessories",
      sales: "13,153",
      salesText: "in sales",
    },
    {
      name: "Healthcare Erbology",
      category: "in Accessories",
      sales: "13,153",
      salesText: "in sales",
    },
    {
      name: "Healthcare Erbology",
      category: "in Accessories",
      sales: "13,153",
      salesText: "in sales",
    },
  ];

  const MetricCard = ({ title, value, icon, color }) => (
    <Card
      sx={{
        height: "100%",
        transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1)',
        cursor: 'pointer',
        boxShadow: 1,
        '&:hover': {
          transform: 'scale(1.04) translateY(-4px)',
          boxShadow: 6,
          background: 'linear-gradient(90deg, #e3f2fd 0%, #fce4ec 100%)',
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "12px",
              backgroundColor: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: 'background 0.3s',
              boxShadow: 2,
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  
  const CustomLineChart = ({ data }) => {
    const width = 400;
    const height = 200;
    const padding = 40;
    const maxValue = Math.max(...data.map((d) => d.value));

    // Calculate points for the line
    const points = data
      .map((item, index) => {
        const x = padding + (index * (width - 2 * padding)) / (data.length - 1);
        const y =
          height - padding - (item.value / maxValue) * (height - 2 * padding);
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <Box sx={{ position: "relative", width: "100%", height: 300 }}>
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height + 40}`}>
          {/* Grid lines */}
          <defs>
            <pattern
              id="grid"
              width="40"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 20"
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Y-axis labels */}
          {[0, 10, 20, 30, 40, 50].map((value, index) => (
            <g key={index}>
              <text
                x={padding - 10}
                y={height - padding - (value / 50) * (height - 2 * padding)}
                textAnchor="end"
                fontSize="12"
                fill="#666"
              >
                {value}
              </text>
            </g>
          ))}

          {/* X-axis labels */}
          {data.map((item, index) => (
            <text
              key={index}
              x={padding + (index * (width - 2 * padding)) / (data.length - 1)}
              y={height + 20}
              textAnchor="middle"
              fontSize="12"
              fill="#666"
            >
              {item.month}
            </text>
          ))}

          {/* Line */}
          <polyline
            fill="none"
            stroke="#2196f3"
            strokeWidth="2"
            points={points}
          />

          {/* Data points */}
          {data.map((item, index) => {
            const x =
              padding + (index * (width - 2 * padding)) / (data.length - 1);
            const y =
              height -
              padding -
              (item.value / maxValue) * (height - 2 * padding);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#2196f3"
                stroke="white"
                strokeWidth="2"
              />
            );
          })}

          {/* Tooltip for May */}
          <g>
            <rect
              x={padding + (4 * (width - 2 * padding)) / (data.length - 1) - 30}
              y={
                height - padding - (35 / maxValue) * (height - 2 * padding) - 35
              }
              width="60"
              height="25"
              rx="4"
              fill="#2c3e50"
            />
            <text
              x={padding + (4 * (width - 2 * padding)) / (data.length - 1)}
              y={
                height - padding - (35 / maxValue) * (height - 2 * padding) - 20
              }
              textAnchor="middle"
              fontSize="10"
              fill="white"
            >
              864 Orders
            </text>
            <text
              x={padding + (4 * (width - 2 * padding)) / (data.length - 1)}
              y={
                height - padding - (35 / maxValue) * (height - 2 * padding) - 10
              }
              textAnchor="middle"
              fontSize="10"
              fill="white"
            >
              May
            </text>
          </g>
        </svg>
      </Box>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        
        <Grid item xs={12} sm={4}>
          <MetricCard
            title="Sales"
            value="$152k"
            icon={<TrendingUp sx={{ color: "white" }} />}
            color="#ff7f7f"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MetricCard
            title="Cost"
            value="$99.7k"
            icon={<TrendingDown sx={{ color: "white" }} />}
            color="#ffb366"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MetricCard
            title="Profit"
            value="$32.1k"
            icon={<AttachMoney sx={{ color: "white" }} />}
            color="#66d9a6"
          />
        </Grid>

        
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1)',
              cursor: 'pointer',
              boxShadow: 1,
              '&:hover': {
                transform: 'scale(1.02) translateY(-2px)',
                boxShadow: 6,
                background: 'linear-gradient(90deg, #e3f2fd 0%, #fce4ec 100%)',
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Sales Revenue
              </Typography>
              <CustomLineChart data={salesData} />
            </CardContent>
          </Card>
        </Grid>

        
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1)',
              cursor: 'pointer',
              boxShadow: 1,
              '&:hover': {
                transform: 'scale(1.02) translateY(-2px)',
                boxShadow: 6,
                background: 'linear-gradient(90deg, #e3f2fd 0%, #fce4ec 100%)',
              },
            }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6" fontWeight="bold">
                  Top selling products
                </Typography>
                <Link
                  href="#"
                  underline="none"
                  sx={{ fontSize: "14px", color: "#2196f3" }}
                >
                  See All →
                </Link>
              </Box>
              <Box>
                {topSellingProducts.map((product, index) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    gap={2}
                    mb={2}
                    sx={{
                      transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1)',
                      cursor: 'pointer',
                      borderRadius: 2,
                      '&:hover': {
                        transform: 'scale(1.04) translateY(-2px)',
                        boxShadow: 4,
                        background: 'linear-gradient(90deg, #e3f2fd 0%, #fce4ec 100%)',
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: "#f5f5f5",
                        transition: 'background 0.3s',
                        boxShadow: 1,
                        '&:hover': {
                          backgroundColor: '#e3f2fd',
                        },
                      }}
                    >
                      <ShoppingCart sx={{ color: "#666" }} />
                    </Avatar>
                    <Box flex={1}>
                      <Typography variant="body2" fontWeight="medium">
                        {product.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {product.category}
                      </Typography>
                    </Box>
                    <Box textAlign="right">
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        color="primary"
                      >
                        {product.sales}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {product.salesText}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1)',
              cursor: 'pointer',
              boxShadow: 1,
              '&:hover': {
                transform: 'scale(1.02) translateY(-2px)',
                boxShadow: 6,
                background: 'linear-gradient(90deg, #e3f2fd 0%, #fce4ec 100%)',
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Recent Transactions
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((transaction, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1)',
                          cursor: 'pointer',
                          '&:hover': {
                            transform: 'scale(1.025) translateY(-2px)',
                            boxShadow: 3,
                            background: 'linear-gradient(90deg, #e3f2fd 0%, #fce4ec 100%)',
                          },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 500 }}>{transaction.name}</TableCell>
                        <TableCell sx={{ color: '#1976d2', fontWeight: 500 }}>{transaction.date}</TableCell>
                        <TableCell sx={{ color: '#388e3c', fontWeight: 500 }}>{transaction.amount}</TableCell>
                        <TableCell>
                          <Chip
                            label={transaction.status}
                            color={
                              transaction.status === "Paid"
                                ? "success"
                                : "warning"
                            }
                            size="small"
                            sx={{
                              backgroundColor:
                                transaction.status === "Paid"
                                  ? "#e8f5e8"
                                  : "#fff3e0",
                              color:
                                transaction.status === "Paid"
                                  ? "#2e7d32"
                                  : "#f57c00",
                              fontWeight: "medium",
                              boxShadow: 1,
                              transition: 'background 0.3s',
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Top Products by Units Sold
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Units</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topProducts.map((product, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1)',
                          cursor: 'pointer',
                          '&:hover': {
                            transform: 'scale(1.025) translateY(-2px)',
                            boxShadow: 3,
                            background: 'linear-gradient(90deg, #e3f2fd 0%, #fce4ec 100%)',
                          },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 500, letterSpacing: 0.2 }}>{product.name}</TableCell>
                        <TableCell sx={{ color: '#1976d2', fontWeight: 500 }}>{product.price}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: 'inline-block',
                              px: 2,
                              py: 0.5,
                              borderRadius: 2,
                              background: 'linear-gradient(90deg, #bbdefb 0%, #f8bbd0 100%)',
                              fontWeight: 600,
                              color: '#333',
                              boxShadow: 1,
                              transition: 'background 0.3s',
                            }}
                          >
                            {product.units}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
