import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Paper } from '@material-ui/core';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import moment from 'moment';
import queryString from 'query-string';
import { Line } from 'react-chartjs-2';

const chartOptions = {
	scales: {
		yAxes: [{
			ticks: {
				beginAtZero: true,
				stepSize: 500
			}
		}]
	}
};

function Home(props) {
	const [dashboardData, setDashboardData] = useState(null);
	const [weeklyTransactions, setWeeklyTransactions] = useState([]);

    let queryData = {
		start: moment().startOf("week").format("llll"),
		end: moment().endOf("week").format("llll"),
		limit: 5,
	};
    let query = queryString.stringify(queryData);

	let weeklyIncome = [];
	if (dashboardData) {
		for (let i = 1; i <= 7; i++) {
			let index = dashboardData.data.items.findIndex((item) => parseInt(item._id) === i);
			if (index === -1) {
				weeklyIncome.push(0);
			} else {
				weeklyIncome.push(dashboardData.data.items[index]["grandtotal"]);
			}
		}
	}

	const chartData = {
		labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		datasets: [{
			label: "Income",
			data: weeklyIncome,
			fill: true,
			backgroundColor: "rgba(255, 99, 132, 0.2)",
			borderColor: "rgb(255, 99, 132)"
		}]
	}

    useEffect(() => {
		async function getDashboardData() {
			let result = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}transaction/dashboard?${query}`);
			let data = await result.json();
			setDashboardData(data);
		}
		getDashboardData();
	}, [query]);
	useEffect(() => {
		async function getWeeklyTransaction() {
			let result = await fetch(
				`${process.env.REACT_APP_BACKEND_API_URL}transaction?${query}`,
			);
			let data = await result.json();
			setWeeklyTransactions(data.data.transactions);
		}
		getWeeklyTransaction();
	}, [query]);

    return (
        <Fragment>
            <div className="dashboard-container text-start">
                <h4>Dashboard</h4>
                <Grid container spacing={2}>
					<Grid item xs={12} lg={4}>
						<Paper className="dashboard-data redCard">
							<h1>{dashboardData && dashboardData.data.count}</h1>
                            <h6>Transaction</h6>
							<CreditCardIcon className="card-icon" />
						</Paper>
					</Grid>
					<Grid item xs={12} lg={4}>
						<Paper className="dashboard-data indigoCard">
                            <h1>{dashboardData && "$" + dashboardData.data.total}</h1>
                            <h6>Income</h6>
							<LocalAtmIcon className="card-icon" />
						</Paper>
					</Grid>
					<Grid item xs={12} lg={4}>
						<Paper className="dashboard-data orangeCard">
                            <h1>{dashboardData && dashboardData.data.qty}</h1>
                            <h6>Products</h6>
							<AccountBalanceWalletIcon className="card-icon" />
						</Paper>
					</Grid>
				</Grid>
				<Grid container  spacing={2} className="mt-4">
					<Grid item lg={6} xs={12}>
						<Paper className="chart">
							<h5>Weekly Chart</h5>
							<Line data={chartData} options={chartOptions} />
						</Paper>
					</Grid>
					<Grid item xs={12} lg={6}>
						<Paper className="table text-start">
							<h5>Weekly Chart</h5>
							<Table className="text-start" aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Reciept no</TableCell>
										<TableCell align="right">Date</TableCell>
										<TableCell align="right">Quantity</TableCell>
										<TableCell align="right">Total</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{weeklyTransactions &&
										weeklyTransactions.map((row) => (
											<TableRow key={row._id}>
												<TableCell component="th" scope="row">
													{row._id}
												</TableCell>

												<TableCell align="right">
													{moment(row._createdAt).format("LLL")}
												</TableCell>
												<TableCell align="right">{row.items.length}</TableCell>
												<TableCell align="right">{row.grandtotal.toFixed(2)}</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</Paper>
					</Grid>
				</Grid>
            </div>
        </Fragment>
    )
}

export default Home;