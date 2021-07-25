import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Paper } from '@material-ui/core';
import moment from 'moment';
import queryString from 'query-string';

function Home(props) {
    let queryData = {
		start: moment().startOf("week").format("llll"),
		end: moment().endOf("week").format("llll"),
		limit: 5,
	};
    const [dashboardData, setDashboardData] = useState(null);
    let query = queryString.stringify(queryData);

    useEffect(() => {
		async function getDashboardData() {
			let result = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}transaction/dashboard?${query}`);
			let data = await result.json();
			setDashboardData(data);
		}
		getDashboardData();
	}, [query]);

    return (
        <Fragment>
            <div className="dashboard-container text-start">
                <h4>Dashboard</h4>
                <Grid container spacing={2}>
					<Grid item xs={12} lg={4} xl={4}>
						<Paper className="dashboard-data redCard">
							<h1>{dashboardData && dashboardData.data.count}</h1>
                            <h6>Transaction</h6>
						</Paper>
					</Grid>
					<Grid item xs={12} lg={4} xl={4}>
						<Paper className="dashboard-data indigoCard">
                            <h1>{dashboardData && "$" + dashboardData.data.total}</h1>
                            <h6>Income</h6>
						</Paper>
					</Grid>
					<Grid item xs={12} lg={4} xl={4}>
						<Paper className="dashboard-data orangeCard">
                            <h1>{dashboardData && dashboardData.data.qty}</h1>
                            <h6>Products</h6>
						</Paper>
					</Grid>
				</Grid>
            </div>
        </Fragment>
    )
}

export default Home;