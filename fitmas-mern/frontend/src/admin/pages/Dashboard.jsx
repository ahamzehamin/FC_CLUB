import React, { useState, useEffect } from 'react';
import ApexChart from '../components/charts/ApexChart';
import ChartistChart from '../components/charts/ChartistChart';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    weeklySales: 92000,
    totalOrder: 34200,
    marketShare: 20,
    newCustomer: 1200,
    balance: 25217,
    projects: 12721,
    activeProjects: 721,
    revenue: 250523,
    workingHours: 12275
  });

  // Chart data
  const weeklySalesData = {
    series: [{
      name: 'Sales',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }],
    options: {
      chart: {
        type: 'area',
        height: 100,
        sparkline: { enabled: true }
      },
      stroke: { curve: 'smooth' },
      colors: ['#0074FF'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          opacityFrom: 0.4,
          opacityTo: 0,
        }
      }
    }
  };

  const orderChartData = {
    series: [{
      name: 'Orders',
      data: [20, 30, 25, 40, 35, 50, 45]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 100,
        sparkline: { enabled: true }
      },
      colors: ['#01BD9B']
    }
  };

  const marketShareData = {
    series: [44, 55, 13],
    options: {
      chart: {
        type: 'donut',
        height: 120
      },
      labels: ['Mobile', 'Laptop', 'Cloths'],
      colors: ['#0074FF', '#01BD9B', '#738293'],
      legend: { show: false }
    }
  };

  const balanceChartData = {
    series: [{
      name: 'Balance',
      data: [20, 25, 30, 35, 40, 45, 50]
    }],
    options: {
      chart: {
        type: 'area',
        height: 200,
        toolbar: { show: false }
      },
      colors: ['#0074FF'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          opacityFrom: 0.4,
          opacityTo: 0,
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      }
    }
  };

  const barChartData = {
    series: [{
      name: 'Projects',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
      name: 'Active',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      },
      fill: { opacity: 1 },
      colors: ['#0074FF', '#01BD9B']
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Page Head */}
      <div className="page-head">
        <div className="row">
          <div className="col-sm-6 mb-sm-4 mb-3">
            <h3>Good Morning, Hanuman</h3>
            <p>Here's what's happening with your store today</p>
          </div>
          <div className="col-sm-6 mb-4 text-sm-end">
            <button className="btn btn-outline-secondary me-2">Add Task</button>
            <button className="btn btn-primary">New Project</button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-9">
          <div className="row">
            {/* Weekly Sales Card */}
            <div className="col-xl-3 col-lg-6">
              <div className="card ic-chart-card">
                <div className="card-header d-block border-0 pb-0">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-0">Weekly Sales</h6>
                    <span className="badge badge-sm badge-success light">+2.7%</span>
                  </div>
                  <span className="data-value">${stats.weeklySales.toLocaleString()}</span>
                </div>
                <div className="card-body p-0">
                  <ApexChart
                    options={weeklySalesData.options}
                    series={weeklySalesData.series}
                    height={100}
                  />
                </div>
              </div>
            </div>

            {/* Total Order Card */}
            <div className="col-xl-3 col-lg-6">
              <div className="card ic-chart-card">
                <div className="card-header d-block border-0">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-0">Total Order</h6>
                    <span className="badge badge-sm badge-info light">+7.2%</span>
                  </div>
                  <span className="data-value">${stats.totalOrder.toLocaleString()}</span>
                </div>
                <div className="card-body p-0 pb-3">
                  <ApexChart
                    options={orderChartData.options}
                    series={orderChartData.series}
                    height={100}
                  />
                </div>
              </div>
            </div>

            {/* Market Share Card */}
            <div className="col-xl-3 col-lg-6">
              <div className="card ic-chart-card">
                <div className="card-header d-block border-0 pb-0">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-0">Market Share</h6>
                    <span className="badge badge-sm badge-success light">80%</span>
                  </div>
                  <span className="data-value">{stats.marketShare}M</span>
                </div>
                <div className="card-body d-flex align-items-center justify-content-between py-2 pe-1">
                  <div className="clearfix">
                    <div className="d-flex align-items-center mb-2">
                      <svg className="me-2" width="13" height="12" viewBox="0 0 13 12" fill="none">
                        <path d="M6.5 0L12.6819 4.49139L10.3206 11.7586H2.6794L0.318133 4.49139L6.5 0Z" fill="#0074FF" />
                      </svg>
                      <span className="text-dark fs-13">Mobile</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <svg className="me-2" width="13" height="12" viewBox="0 0 13 12" fill="none">
                        <path d="M6.5 0L12.6819 4.49139L10.3206 11.7586H2.6794L0.318133 4.49139L6.5 0Z" fill="#01BD9B" />
                      </svg>
                      <span className="text-dark fs-13">Laptop</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <svg className="me-2" width="13" height="12" viewBox="0 0 13 12" fill="none">
                        <path d="M6.5 0L12.6819 4.49139L10.3206 11.7586H2.6794L0.318133 4.49139L6.5 0Z" fill="#738293" />
                      </svg>
                      <span className="text-dark fs-13">Cloths</span>
                    </div>
                  </div>
                  <ApexChart
                    options={marketShareData.options}
                    series={marketShareData.series}
                    type="donut"
                    height={120}
                  />
                </div>
              </div>
            </div>

            {/* New Customer Card */}
            <div className="col-xl-3 col-lg-6">
              <div className="card ic-chart-card">
                <div className="card-header d-block border-0 pb-0">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-0">New Customer</h6>
                    <span className="badge badge-sm badge-success light">15%</span>
                  </div>
                  <span className="data-value">{stats.newCustomer.toLocaleString()}</span>
                </div>
                <div className="card-footer border-0 mt-auto">
                  <h6>Today Customer</h6>
                  <ul className="avtar-list">
                    <li><img className="avatar avatar-circle borderd" src="/images/avatar/avatar1.jpg" alt="" /></li>
                    <li><img className="avatar avatar-circle borderd" src="/images/avatar/avatar2.jpg" alt="" /></li>
                    <li><img className="avatar avatar-circle borderd" src="/images/avatar/avatar3.jpg" alt="" /></li>
                    <li><img className="avatar avatar-circle borderd" src="/images/avatar/avatar4.jpg" alt="" /></li>
                    <li><img className="avatar avatar-circle borderd" src="/images/avatar/avatar5.jpg" alt="" /></li>
                    <li><img className="avatar avatar-circle borderd" src="/images/avatar/avatar6.jpg" alt="" /></li>
                    <li><div className="avatar-label avatar-light avatar-circle">+4K</div></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* More dashboard cards */}
          <div className="row">
            {/* People Contact */}
            <div className="col-xl-5">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <h5>People Contact</h5>
                </div>
                <div className="card-body">
                  <div className="row g-2">
                    {[
                      { name: 'Jordana Niclany', email: 'jordan@mail.com', img: '/images/avatar/avatar1.jpg' },
                      { name: 'Jacob Jack', email: 'jordan@mail.com', initials: 'KD' },
                      { name: 'Sammy Nico', email: 'jordan@mail.com', img: '/images/avatar/avatar3.jpg' },
                      { name: 'Gibs Gibsy', email: 'jordan@mail.com', img: '/images/avatar/avatar4.jpg' },
                      { name: 'Sam Sammy', email: 'jordan@mail.com', img: '/images/avatar/avatar5.jpg' },
                      { name: 'Corey Core', email: 'jordan@mail.com', img: '/images/avatar/avatar6.jpg' }
                    ].map((person, index) => (
                      <div key={index} className="col-xl-4 col-sm-4 col-6">
                        <div className="avatar-card text-center border-dashed rounded px-2 py-3">
                          {person.img ? (
                            <img className="avatar avatar-lg avatar-circle mb-2" src={person.img} alt="" />
                          ) : (
                            <div className="avatar avatar-label avatar-lg bg-success-light text-success avatar-circle mb-2 mx-auto">
                              {person.initials}
                            </div>
                          )}
                          <h6 className="mb-0">{person.name}</h6>
                          <span className="fs-12">{person.email}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <div className="col-xl-3 col-md-6">
              <div className="card">
                <div className="card-body mb-0">
                  <ChartistChart
                    type="pie"
                    data={{
                      series: [25, 75]
                    }}
                    options={{
                      donut: true,
                      donutWidth: 20,
                      startAngle: 0,
                      total: 100,
                      showLabel: false
                    }}
                    className="redial"
                  />
                  <div className="redia-date text-center">
                    <h4>My Progress</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur</p>
                  </div>
                </div>
                <div className="card-footer text-center border-0 pt-0">
                  <button className="btn btn-primary">More Details</button>
                </div>
              </div>
            </div>

            {/* Balance Card */}
            <div className="col-xl-4 col-md-6">
              <div className="card blance">
                <div className="card-header align-items-baseline border-0 pb-0">
                  <div>
                    <h5 className="mb-0">Your Balance</h5>
                    <h4 className="mb-0">${stats.balance.toLocaleString()}k</h4>
                  </div>
                  <p className="mb-0 fs-14 ms-auto">
                    <span className="text-success">+2.7% </span>than last week
                  </p>
                </div>
                <div className="card-body pt-0">
                  <ApexChart
                    options={balanceChartData.options}
                    series={balanceChartData.series}
                    height={200}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Sellers Sidebar */}
        <div className="col-xl-3">
          <div className="card saller">
            <div className="card-header border-0 d-block text-white pb-0">
              <h4 className="text-white mb-0">Top Sellers</h4>
              <span>Users from all channels</span>
            </div>
            <div className="card-body">
              <div className="seller-slider">
                {/* Swiper will be integrated here */}
                <div className="swiper mySwiper swiper-lr">
                  <div className="swiper-wrapper">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="swiper-slide">
                        <div className="card">
                          <div className="card-body product">
                            <img src={`/images/swiper/shirt${item % 2 + 1}.jpg`} alt="" />
                            <div className="product-imfo">
                              <div className="d-flex justify-content-between">
                                <span className="text-danger">up to 79% off</span>
                                <h6 className="font-w600">$80</h6>
                              </div>
                              <div className="d-flex justify-content-between">
                                <h6 className="font-w600">Block Tiered Dress.</h6>
                                <span><del>$95</del></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="product-details">
                <h4>Your Finances, safe and Secure</h4>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                <div className="d-flex align-items-center">
                  <ul className="avtar-list">
                    <li><img className="avatar avatar-circle borderd" src="/images/avatar/avatar1.jpg" alt="" /></li>
                    <li><img className="avatar avatar-circle borderd" src="/images/avatar/avatar2.jpg" alt="" /></li>
                    <li><img className="avatar avatar-circle borderd" src="/images/avatar/avatar3.jpg" alt="" /></li>
                    <li><img className="avatar avatar-circle borderd" src="/images/avatar/avatar4.jpg" alt="" /></li>
                    <li><img className="avatar avatar-circle borderd" src="/images/avatar/avatar5.jpg" alt="" /></li>
                    <li><img className="avatar avatar-circle borderd" src="/images/avatar/avatar6.jpg" alt="" /></li>
                    <li><div className="avatar-label avatar-light avatar-circle">+4K</div></li>
                  </ul>
                  <div className="ms-3">
                    <h4 className="mb-0">15k+</h4>
                    <span>Happy Clients</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="row">
        {/* Your Balance Chart */}
        <div className="col-xl-6">
          <div className="card overflow-hidden">
            <div className="card-header border-0 pb-0 flex-wrap">
              <div className="blance-media">
                <h5 className="mb-0">Your Balance</h5>
                <h4 className="mb-0">${stats.balance.toLocaleString()}k <span className="badge badge-sm badge-success light">+2.7%</span></h4>
              </div>
              <ul className="nav nav-pills mix-chart-tab" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" data-series="week" id="pills-week-tab" type="button">Week</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" data-series="month" id="pills-month-tab" type="button">Month</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" data-series="year" id="pills-year-tab" type="button">Year</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" data-series="all" id="pills-all-tab" type="button">All</button>
                </li>
              </ul>
            </div>
            <div className="card-body p-0">
              <ApexChart
                options={barChartData.options}
                series={barChartData.series}
                type="bar"
                height={350}
              />
              <div className="ttl-project">
                <div className="pr-data">
                  <h5>{stats.projects.toLocaleString()}</h5>
                  <span>Number of Projects</span>
                </div>
                <div className="pr-data">
                  <h5 className="text-primary">{stats.activeProjects}</h5>
                  <span>Active Projects</span>
                </div>
                <div className="pr-data">
                  <h5>${stats.revenue.toLocaleString()}</h5>
                  <span>Revenue</span>
                </div>
                <div className="pr-data">
                  <h5 className="text-success">{stats.workingHours.toLocaleString()}h</h5>
                  <span>Working Hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header flex-wrap">
              <h4 className="mb-0">Transaction Details</h4>
              <div className="d-flex align-items-center justify-content-between transaction flex-wrap">
                <div className="input-group search-area style-1">
                  <span className="input-group-text"><i className="flaticon-search-interface-symbol"></i></span>
                  <input type="text" className="form-control" placeholder="Search" />
                </div>
                <button className="btn me-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2.66699 4.66699H13.3337" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.66699 8L9.33366 8" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.66699 11.333H4.00033" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Sort By
                </button>
                <button className="btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M11.1594 3.33301H4.84121C3.98686 3.33301 3.52595 4.33513 4.08196 4.9838L6.42625 7.71881C6.5816 7.90005 6.66699 8.13089 6.66699 8.3696V11.3816C6.66699 11.7604 6.881 12.1067 7.21978 12.2761L7.88645 12.6094C8.55135 12.9419 9.33366 12.4584 9.33366 11.715V8.3696C9.33366 8.13089 9.41905 7.90005 9.5744 7.71881L11.9187 4.9838C12.4747 4.33513 12.0138 3.33301 11.1594 3.33301Z" stroke="#1C2430" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Filter
                </button>
              </div>
            </div>
            <div className="card-body pb-2">
              <div className="table-responsive">
                <table className="table transaction-tbl ItemsCheckboxSec">
                  <thead className="border-self">
                    <tr>
                      <th>
                        <div className="form-check custom-checkbox ms-0">
                          <input type="checkbox" className="form-check-input checkAllInput" id="checkAll" />
                          <label className="form-check-label" htmlFor="checkAll"></label>
                        </div>
                        <span>ID</span>
                      </th>
                      <th>Date</th>
                      <th>Client</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: '129361171', date: '18 Feb 2024', client: 'Rolex leo', payment: '$376.24', status: 'Completed' },
                      { id: '129361178', date: '18 Feb 2024', client: 'Jaction leo', payment: '$376.24', status: 'Completed' },
                      { id: '129361179', date: '18 Feb 2024', client: 'Rolex leo', payment: '$254.24', status: 'Inprogress' },
                      { id: '129361180', date: '18 Feb 2024', client: 'Meview Otis', payment: '$254.24', status: 'Pending' }
                    ].map((transaction, index) => (
                      <tr key={index}>
                        <td>
                          <div className="form-check custom-checkbox">
                            <input type="checkbox" className="form-check-input" id={`checkBox${index}`} />
                            <label className="form-check-label" htmlFor={`checkBox${index}`}></label>
                          </div>
                          <span>{transaction.id}</span>
                        </td>
                        <td><p className="mb-0 ms-2">{transaction.date}</p></td>
                        <td className="">{transaction.client}</td>
                        <td><span className={`text-${transaction.payment.includes('376') ? 'success' : 'warning'}`}>{transaction.payment}</span></td>
                        <td className="pe-0">
                          <span className={`badge badge-${transaction.status.toLowerCase()} light border-0`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td>
                          <div className="dropdown ms-2">
                            <div className="btn-link custome-d" data-bs-toggle="dropdown">
                              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                                <rect y="7" width="2" height="2" fill="black" />
                                <rect width="2" height="2" fill="black" />
                                <rect x="7" y="7" width="2" height="2" fill="black" />
                                <rect x="7" width="2" height="2" fill="black" />
                              </svg>
                            </div>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a className="dropdown-item" href="#">Delete</a>
                              <a className="dropdown-item" href="#">Edit</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="copyright">
          <p>Copyright © Designed & Developed by <a href="#" target="_blank">DexignLab</a> <span className="current-year">2024</span></p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
