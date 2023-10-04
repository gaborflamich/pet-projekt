import { Routes } from '@angular/router';
import { ErrorHandlingComponent } from './core/components/error-pages/error-handling/error-handling.component';
import { AlbumsResolver } from './modules/albums/albums.resolver';
import { AlbumSingleResolver } from './modules/album-single/album-single.resolver';

export const appRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'shopping-list',
        loadComponent: () => import('./modules/shopping-list/shopping-list.component').then((m) => m.ShoppinglistComponent),
        title: 'Shopping List',
      },
      {
        path: 'expense-tracker',
        loadComponent: () => import('./modules/expense-tracker/expense-tracker.component').then((m) => m.ExpenseTrackerComponent),
        title: 'Expense Tracker',
      },
      {
        path: 'todo-list',
        loadComponent: () => import('./modules/todo-list/todo-list.component').then((m) => m.TodoListComponent),
        title: 'Todo List',
      },
      {
        path: 'search',
        loadComponent: () => import('./modules/search/search.component').then((m) => m.SearchComponent),
        title: 'Search',
      },
      {
        path: 'albums',
        loadComponent: () => import('./modules/albums/albums.component').then((m) => m.AlbumsComponent),
        resolve: { albums: AlbumsResolver },
        title: 'Albums',
      },
      {
        path: 'albums/:id',
        loadComponent: () => import('./modules/album-single/album-single.component').then((m) => m.AlbumSingleComponent),
        resolve: { photos: AlbumSingleResolver },
      },
      {
        path: 'pipe',
        loadComponent: () => import('./modules/pipe/pipe.component').then((m) => m.PipeComponent),
        title: 'Pipe',
      },
      {
        path: 'login',
        loadComponent: () => import('./modules/login/login.component').then((m) => m.LoginComponent),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () => import('./modules/register/register.component').then((m) => m.RegisterComponent),
        title: 'Register',
      },
      {
        path: 'calculator',
        loadComponent: () => import('./modules/calculator/calculator.component').then((m) => m.CalculatorComponent),
        title: 'Calculator',
      },
      {
        path: 'movies',
        loadComponent: () => import('./modules/movies/movies.component').then((m) => m.MoviesComponent),
        title: 'Movies',
      },
      {
        path: 'add-movie',
        loadComponent: () => import('./modules/movies/add-movie/add-movie.component').then((m) => m.AddMovieComponent),
        title: 'Add Movie',
      },
      {
        path: 'filter-movie',
        loadComponent: () => import('./modules/movies/filter-movies/filter-movies.component').then((m) => m.FilterMoviesComponent),
        title: 'Filter Movie',
      },
      {
        path: 'pagination',
        loadComponent: () => import('./modules/movies/pagination/pagination.component').then((m) => m.PaginationComponent),
        title: 'Pagination',
      },
      {
        path: 'wordpress',
        loadComponent: () => import('./modules/wordpress/wordpress.component').then((m) => m.WordpressComponent),
        title: 'Wordpress',
      },
      {
        path: 'filter',
        loadComponent: () => import('./components/filter/filter.component').then((m) => m.FilterComponent),
        title: 'Filter',
      },
      {
        path: 'cookie',
        loadComponent: () => import('./components/cookie/cookie.component').then((m) => m.CookieComponent),
        title: 'Cookie',
      },
      {
        path: 'modal',
        loadComponent: () => import('./components/modal/modal.component').then((m) => m.ModalComponent),
        title: 'Modal',
      },
      {
        path: '404',
        component: ErrorHandlingComponent,
        data: { errorCode: '404' },
      },
      {
        path: '500',
        component: ErrorHandlingComponent,
        data: { errorCode: '500' },
      },
      {
        path: '**',
        redirectTo: '404',
      },
    ],
  },
];
