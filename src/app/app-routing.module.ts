import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: '_pages/home/home.module#HomePageModule' },
  { path: '', loadChildren: '_pages/dashboard/dashboard.module#DashboardPageModule' },
  { path: '', loadChildren: '_pages/group/group.module#GroupPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: false, // <-- debugging purposes only
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
