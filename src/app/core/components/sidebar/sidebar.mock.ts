import { INav } from './sidebar.definitions';

export const MockSidebar: INav = {
  apps: [
    {
      title: 'Todo List',
      url: 'todo-list',
    },
    {
      title: 'Shopping List',
      url: 'shopping-list',
    },
    {
      title: 'Expense Tracker',
      url: 'expense-tracker',
    },
    {
      title: 'Movies',
      url: 'movies',
      children: [
        {
          title: 'Add movie',
          url: 'add-movie',
        },
        {
          title: 'Filter movie',
          url: 'filter-movie',
        },
        {
          title: 'Pagination',
          url: 'pagination',
        },
      ],
    },
    {
      title: 'Calculator',
      url: 'calculator',
    },
    {
      title: 'Search',
      url: 'search',
    },
    {
      title: 'Albums',
      url: 'albums',
    },
    // {
    //   title: 'Pipes',
    //   url: 'pipe',
    // },
  ],
  todayPlan: [
    {
      title: 'Authentication',
      url: '#',
    },
    {
      title: 'Guards',
      url: '#',
    },
    // {
    //   title: 'Google Maps',
    //   url: '#',
    // },
    // {
    //   title: 'Operators',
    //   url: '#',
    // },
  ],
  components: [
    {
      title: 'Cookie Notice',
      url: 'cookie',
    },
    {
      title: 'Filter',
      url: 'filter',
    },
    {
      title: 'Modal',
      url: 'modal',
    },
  ],
  weeklyPlan: [
    {
      title: 'CFRS Token',
      url: '#',
    },
    {
      title: 'Authentication',
      url: '#',
    },
    {
      title: 'Guards',
      url: '#',
    },
    {
      title: 'Pipe Operators',
      url: '#',
    },
    {
      title: 'filter, tap, map, catchError, switchMap',
      url: '#',
    },
  ],
  futureApps: [
    {
      title: 'Client Panel',
      url: '#',
    },
    {
      title: 'Google Maps',
      url: '#',
    },
    {
      title: 'Job Portal',
      url: '#',
    },
    {
      title: 'Currency Converter',
      url: '#',
    },
    {
      title: 'GitHub Finder',
      url: '#',
    },
    {
      title: 'Book List',
      url: '#',
    },
    {
      title: 'Weather App',
      url: '#',
    },
    {
      title: 'Automotive',
      url: '#',
    },
    {
      title: 'Real Estate',
      url: '#',
    },

    {
      title: 'Booking Platform',
      url: '#',
    },
    {
      title: 'E-Commerce Platform',
      url: '#',
    },
  ],
};
