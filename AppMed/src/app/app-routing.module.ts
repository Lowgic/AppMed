import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'images-form',
    loadChildren: () => import('./images-form/images-form.module').then( m => m.ImagesFormPageModule)
  },
  {
    path: 'images-form2',
    loadChildren: () => import('./images-form2/images-form2.module').then( m => m.ImagesForm2PageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
