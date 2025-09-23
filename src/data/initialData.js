export const initialDashboardData = {
  categories: [
    {
      id: 'cspm-executive',
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'cloud-accounts',
          name: 'Cloud Accounts',
          text: 'Connected: 2\nNot Connected: 2',
          type: 'donut',
          data: {
            total: 2,
            items: [
              { name: 'Connected', value: 2, color: '#3b82f6' },
              { name: 'Not Connected', value: 2, color: '#e5e7eb' }
            ]
          },

        },
        {
          id: 'cloud-security',
          name: 'Cloud Account Risk Assessment',
          text: 'Failed: 1689\nWarning: 681\nNot available: 36\nPassed: 7253',
          type: 'donut',
          data: {
            total: 9659,
            items: [
              { name: 'Failed', value: 1689, color: '#dc2626' },
              { name: 'Warning', value: 681, color: '#f59e0b' },
              { name: 'Not available', value: 36, color: '#9ca3af' },
              { name: 'Passed', value: 7253, color: '#059669' }
            ]
          },

        }
      ]
    },
    {
      id: 'cwpp-dashboard',
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 'top-alerts',
          name: 'Top 5 Namespace Specific Alerts',
          text: 'No Graph data available!',
          type: 'empty',

        },
        {
          id: 'workload-alerts',
          name: 'Workload Alerts',
          text: 'No Graph data available!',
          type: 'empty',

        }
      ]
    },
    {
      id: 'registry-scan',
      name: 'Registry Scan',
      widgets: [
        {
          id: 'image-risk',
          name: 'Image Risk Assessment',
          text: '1470 Total Vulnerabilities',
          type: 'progress',
          data: {
            total: 1470,
            items: [
              { name: 'Critical', value: 9, color: '#7f1d1d' },
              { name: 'High', value: 150, color: '#dc2626' }
            ]
          },

        },
        {
          id: 'image-security',
          name: 'Image Security Issues',
          text: '2 Total Images',
          type: 'progress',
          data: {
            total: 2,
            items: [
              { name: 'Critical', value: 2, color: '#7f1d1d' },
              { name: 'High', value: 2, color: '#dc2626' }
            ]
          },
        }
      ]
    }
  ]
};