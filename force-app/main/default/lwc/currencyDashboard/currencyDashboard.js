import { refreshApex } from '@salesforce/apex';
import getCurrencies from '@salesforce/apex/CurrencyDashboardController.getCurrencies';
import refreshRates from '@salesforce/apex/CurrencyDashboardController.refreshRates';
import chartjs from '@salesforce/resourceUrl/chartjs';
import { loadScript } from 'lightning/platformResourceLoader';
import { LightningElement, track, wire } from 'lwc';

export default class CurrencyDashboard extends LightningElement {
    @track currencies = [];
    @track filteredCurrencies = [];
    searchKey = '';
    minRate = null;
    maxRate = null;
    isRefreshing = false;

    wiredResult;
    chartInitialized = false;
    chart;

    @wire(getCurrencies)
    wiredCurrencies(result) {
        this.wiredResult = result;

        if (result.data) {
            this.currencies = result.data;
            this.applyFilters();
        }
        if (result.error) {
            console.error(result.error);
        }
    }

    renderedCallback() {
        if (this.chartInitialized) return;
        this.chartInitialized = true;

        loadScript(this, chartjs)
        .then(() => this.refreshChart())
        .catch(err => console.error(err));
    }

    // FILTER HANDLERS
    handleSearchChange(e) {
        this.searchKey = e.target.value.toUpperCase();
        this.applyFilters();
    }

    handleMinRateChange(e) {
        this.minRate = e.target.value ? parseFloat(e.target.value) : null;
        this.applyFilters();
    }

    handleMaxRateChange(e) {
        this.maxRate = e.target.value ? parseFloat(e.target.value) : null;
        this.applyFilters();
    }

    applyFilters() {
        this.filteredCurrencies = this.currencies.filter(row => {
            const searchMatch =
                !this.searchKey ||
                row.Currency_Code__c.toUpperCase().includes(this.searchKey);

            const minMatch = this.minRate === null || row.Rate__c >= this.minRate;
            const maxMatch = this.maxRate === null || row.Rate__c <= this.maxRate;

            return searchMatch && minMatch && maxMatch;
        });

        this.refreshChart();
    }

    refreshChart() {
        if (!this.filteredCurrencies.length) return;

        const canvas = this.template.querySelector('canvas.chart');
        if (!canvas) return;

        const labels = this.filteredCurrencies.map(r => r.Currency_Code__c);
        const data = this.filteredCurrencies.map(r => r.Rate__c);

        if (this.chart) {
            this.chart.destroy();
        }

        // eslint-disable-next-line no-undef
        this.chart = new window.Chart(canvas, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Exchange Rate',
                    data
                }]
            }
        });
    }

    async handleRefresh() {
        this.isRefreshing = true;
        try {
            await refreshRates();
            await refreshApex(this.wiredResult);
            this.applyFilters();
        } finally {
            this.isRefreshing = false;
        }
    }
}