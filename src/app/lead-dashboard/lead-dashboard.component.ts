import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { BridgeService } from '../modules/service/bridge.service';
  // import { Chart } from 'node_modules/chart.js';
  import Chart from 'chart.js/auto';
  import { HttpClient } from '@angular/common/http';
  declare var $: any;
@Component({
  selector: 'app-lead-dashboard',
  templateUrl: './lead-dashboard.component.html',
  styleUrls: ['./lead-dashboard.component.css']
})
export class LeadDashboardComponent implements OnInit {

    UserName: any;
    SalesEmployeeCode: any;
    barChartdata: any;
    barChartdata2: any;
    revanue: any;
    sales: any;
    sales_diff: any;
    notification: any;
    constructor(private modalService: NgbModal, private bridgeService: BridgeService, private route: Router,private http: HttpClient) {
    }

    ngOnInit(): void {




      this.bridgeService.autoCall();

      this.UserName = sessionStorage.getItem('UserName');
      this.SalesEmployeeCode = sessionStorage.getItem('SalesEmployeeCode');
      if (this.UserName == undefined) {
        this.route.navigate(['/login']);
      }


      this.CharFunction();


    }



    CharFunction(){

          // Bar chart3
          var barChart3 = new Chart("barChart3", {
            type: 'bar',
            data: {
              labels: ['Red', 'Blue', 'Yellow', 'Purple', 'Orange'],
              datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              },
              {
                label: '# of Votes 2',
                data: [9, 1, 18, 15, 2, 13],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });


            // Bar chart4
            var barChart4 = new Chart("barChart4", {
              type: 'bar',
              data: {
                labels: ['Red', 'Blue', 'Yellow', 'Purple', 'Orange'],
                datasets: [{
                  label: '# of Votes',
                  data: [12, 19, 3, 5, 2, 3],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
                },
                {
                  label: '# of Votes 2',
                  data: [9, 1, 18, 15, 2, 13],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }
            });

  // Line Chart

  var xValues = [100,200,300,400,500,600,700,800,900,1000];
  var lineChart = new Chart("lineChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        label: 'Collection',
        data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478],
        borderColor: "#4a79e4",
        fill: false
      },{
        label: 'Projection',
        data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000],
        borderColor: "#85afff",
        fill: false
      }]
    },
    options: {
      // legend: {display: false}
    }
  });

  // Pie Chart

  var xValues2 = ["Slow Moving", "Fast Moving", "Non Moving"];
  var yValues = [55, 49, 44];
  var barColors = [
    "#ff7ca3",
    "#ffb572",
    "#65b0f6"
  ];

  var pieChart = new Chart("pieChart", {
    type: "pie",
    data: {
      labels: xValues2,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      // title: {
      //   display: true,
      //   text: "World Wide Wine Production 2018"
      // }
    }
  });

    }


  }
