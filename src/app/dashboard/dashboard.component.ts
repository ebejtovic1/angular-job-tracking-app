import { Component, OnInit } from '@angular/core';
import {StatsService} from "../services/stats.service";
import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexPlotOptions,
    ApexYAxis,
    ApexLegend,
    ApexStroke,
    ApexXAxis,
    ApexFill,
    ApexTooltip, ApexGrid
} from 'ng-apexcharts';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    statsData: any;
    public chartOptions: Partial<ChartOptions>;
    constructor(private statsService: StatsService) {

    }
    ngOnInit() {
        {
            // @ts-ignore
            this.chartOptions = {
                series: [
                    {
                        name: "count",
                        data: [0, 0, 0, 0, 2, 0, 0, 0, 0]
                    }
                ],

                chart: {
                    type: "bar",
                    height: 350,
                    toolbar: {
                        show: false
                    }

                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: "55%",
                    }
                },

                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ["transparent"]
                },
                xaxis: {
                    categories: [
                        "",
                        "",
                        "",
                        "",
                        "Sep 2023",
                        "",
                        "",
                        "",
                        ""
                    ],
                    axisBorder: {
                        show: true,
                        color: 'black', // Boja linije za x osu
                        strokeWidth: 3 // Debljina linije za x osu
                    },


                },
                yaxis: {

                    min: 0,
                    max: 4,
                    labels: {
                        formatter: function (value) {
                            return Math.round(value).toString(); // Zaokruživanje na cijeli broj
                        }
                    },
                    tickAmount: 4,
                    axisBorder: {
                        show: true,
                        color: 'gray', // Boja linije za x osu
                        width: 2 // Debljina linije za x osu
                    }
                },

                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function(val) {
                            return "" + val + "";
                        }
                    }
                }
            };
        }

        this.statsService.getStats().subscribe((data: any)=>{
            this.statsData=data;
        });



  }

}
